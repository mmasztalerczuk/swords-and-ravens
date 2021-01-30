import GameState from "../../GameState";
import IngameGameState from "../IngameGameState";
import {ClientMessage} from "../../../messages/ClientMessage";
import Player from "../Player";
import Order from "../game-data-structure/Order";
import Region from "../game-data-structure/Region";
import World from "../game-data-structure/World";
import orders from "../game-data-structure/orders";
import {ServerMessage} from "../../../messages/ServerMessage";
import EntireGame from "../../EntireGame";
import {observable} from "mobx";
import BetterMap from "../../../utils/BetterMap";
import Game from "../game-data-structure/Game";
import PlanningRestriction from "../game-data-structure/westeros-card/planning-restriction/PlanningRestriction";
import planningRestrictions from "../game-data-structure/westeros-card/planning-restriction/planningRestrictions";
import House from "../game-data-structure/House";
import User from "../../../server/User";
import { PlayerActionType } from "../game-data-structure/GameLog";

export default class PlanningGameState extends GameState<IngameGameState> {
    planningRestrictions: PlanningRestriction[];
    // Server-side, the value of the map should never be null.
    // Client-side, the client can receive a null value if it is the order of an other player,
    // it thus represents a face-down order (this player can't see it).
    @observable placedOrders: BetterMap<Region, Order | null> = new BetterMap<Region, Order | null>();
    @observable readyHouses: House[] = [];

    get ingameGameState(): IngameGameState {
        return this.parentGameState;
    }

    get game(): Game {
        return this.ingameGameState.game;
    }

    get world(): World {
        return this.game.world;
    }

    get entireGame(): EntireGame {
        return this.ingameGameState.entireGame;
    }

    constructor(ingameGameState: IngameGameState) {
        super(ingameGameState);
    }

    firstStart(planningRestrictions: PlanningRestriction[]): void {
        this.ingameGameState.log({
            type: "planning-phase-began"
        });

        this.planningRestrictions = planningRestrictions;

        // Automatically set ready for houses which don't have units left
        this.game.houses.forEach(h => {
            if (this.getPossibleRegionsForOrders(h).length == 0) {
                this.setReady(this.ingameGameState.getControllerOfHouse(h));
            }
        });
    }

    onPlayerMessage(player: Player, message: ClientMessage): void {
        if (message.type == "place-order") {
            const order = message.orderId ?orders.get(message.orderId) : null;
            const region = this.world.regions.get(message.regionId);

            if (!this.getPossibleRegionsForOrders(player.house).includes(region)) {
                return;
            }

            if (order && !this.isOrderAvailable(player.house, order)) {
                return;
            }

            // When a player placed or removed an order he is unready
            this.setUnready(player);

            if (order) {
                this.placedOrders.set(region, order);
            } else {
                if (this.placedOrders.has(region)) {
                    this.placedOrders.delete(region);
                }
            }

            if (order) {
                player.user.send({
                    type: "order-placed",
                    order: order.id,
                    region: region.id
                });

                // Send order-placed message to all clients including spectators
                this.entireGame.sendMessageToClients(this.entireGame.users.values.filter(usr => usr != player.user), {
                    type: "order-placed",
                    region: region.id,
                    order: null
                });
            } else {
                this.entireGame.broadcastToClients({
                    type: "remove-placed-order",
                    regionId: region.id
                })
            }
        } else if (message.type == "ready") {
            this.setReady(player);
        } else if (message.type == "unready") {
            this.setUnready(player);
        }
    }

    private setReady(player: Player): void {
        if (!this.canReady(player.house).status) {
            return;
        }

        this.readyHouses.push(player.house);

        this.ingameGameState.log({
            type: "player-action",
            house: player.house.id,
            action: PlayerActionType.ORDERS_PLACED
        })

        // Check if all player are ready to go the action entireGame state
        if (this.readyHouses.length == this.ingameGameState.players.values.length) {
            this.ingameGameState.proceedToActionGameState(this.placedOrders as BetterMap<Region, Order>, this.planningRestrictions);
        } else {
            this.entireGame.broadcastToClients({
                type: "player-ready",
                userId: player.user.id
            });
        }
    }

    setUnready(player: Player): void {
        if (!this.canUnready(player).status) {
            return;
        }

        this.readyHouses.splice(this.readyHouses.indexOf(player.house), 1);

        this.entireGame.broadcastToClients({
            type: "player-unready",
            userId: player.user.id
        });
    }

    serializeToClient(admin: boolean, player: Player | null): SerializedPlanningGameState {
        const placedOrders = this.placedOrders.mapOver(r => r.id, (o, r) => {
            // Hide orders that doesn't belong to the player
            // If admin, send all orders.
            if (admin || (player && r.getController() == player.house)) {
                return o ? o.id : null;
            }
            return null;
        });

        return {
            type: "planning",
            planningRestrictions: this.planningRestrictions.map(pr => pr.id),
            placedOrders: placedOrders,
            readyHouses: this.readyHouses.map(h => h.id)
        };
    }

    /*
     * Common
     */

    getPossibleRegionsForOrders(house: House): Region[] {
        return this.game.world.getControlledRegions(house).filter(r => r.units.size > 0);
    }

    isOrderAvailable(house: House, order: Order): boolean {
        return this.getAvailableOrders(house).includes(order);
    }

    canReady(house: House): {status: boolean; reason: string} {
        if (this.isReady(this.ingameGameState.getControllerOfHouse(house))) {
            return {status: false, reason: "already-ready"};
        }

        const possibleRegions = this.getPossibleRegionsForOrders(house);

        if (possibleRegions.every(r => this.placedOrders.has(r)))
        {
            // All possible regions have orders
            return {status: true, reason: "all-regions-filled"};
        }

        // It is possible that a house controls more areas than it has available orders
        if (this.getAvailableOrders(house).length == 0) {
            return {status: true, reason: "all-available-orders-used"};
        }

        return {status: false, reason: "not-all-regions-filled"};
    }

    canUnready(player: Player): {status: boolean; reason: string} {
        if (!this.isReady(player)) {
            return {status: false, reason: "not-ready"};
        }

        return {status: true, reason: "player-can-unready"};
    }

    /**
     * Client
     */

    assignOrder(region: Region, order: Order | null): void {
        this.entireGame.sendMessageToServer({
            type: "place-order",
            regionId: region.id,
            orderId: order ? order.id : null
        });
    }

    ready(): void {
        this.entireGame.sendMessageToServer({
            type: "ready"
        });
    }

    unready(): void {
        this.entireGame.sendMessageToServer({
            type: "unready"
        });
    }

    onServerMessage(message: ServerMessage): void {
        if (message.type == "order-placed") {
            const region = this.world.regions.get(message.region);
            const order = message.order ? orders.get(message.order) : null;

            this.placedOrders.set(region, order);
        } else if (message.type == "remove-placed-order") {
            const region = this.world.regions.get(message.regionId);

            if (this.placedOrders.has(region)) {
                this.placedOrders.delete(region);
            }
        } else if (message.type == "player-ready") {
            const player = this.ingameGameState.players.get(this.entireGame.users.get(message.userId));

            this.readyHouses.push(player.house);
        } else if (message.type == "player-unready") {
            const player = this.ingameGameState.players.get(this.entireGame.users.get(message.userId));

            this.readyHouses.splice(this.readyHouses.indexOf(player.house), 1);
        }
    }

    /**
     * Queries
     */

    getNotReadyPlayers(): Player[] {
        return this.ingameGameState.players.values.filter(p => !this.readyHouses.includes(p.house));
    }

    getWaitedUsers(): User[] {
        return this.getNotReadyPlayers().map(p => p.user);
    }

    getAvailableOrders(house: House): Order[] {
        return this.ingameGameState.game.getAvailableOrders(this.placedOrders, house, this.planningRestrictions);
    }

    isOrderRestricted(order: Order): boolean {
        return this.planningRestrictions.some(restriction => restriction.restriction(order.type));
    }

    isReady(player: Player): boolean {
        return this.readyHouses.includes(player.house);
    }

    static deserializeFromServer(ingameGameState: IngameGameState, data: SerializedPlanningGameState): PlanningGameState {
        const planningGameState = new PlanningGameState(ingameGameState);

        planningGameState.planningRestrictions = data.planningRestrictions.map(prid => planningRestrictions.get(prid));
        planningGameState.placedOrders = new BetterMap(
            data.placedOrders.map(
                ([regionId, orderId]) => [
                    ingameGameState.world.regions.get(regionId),
                    orderId ? orders.get(orderId) : null
                ]
            )
        );
        planningGameState.readyHouses = data.readyHouses.map(hid => ingameGameState.game.houses.get(hid));

        return planningGameState;
    }
}

export interface SerializedPlanningGameState {
    type: "planning";
    planningRestrictions: string[];
    placedOrders: [string, number | null][];
    readyHouses: string[];
}
