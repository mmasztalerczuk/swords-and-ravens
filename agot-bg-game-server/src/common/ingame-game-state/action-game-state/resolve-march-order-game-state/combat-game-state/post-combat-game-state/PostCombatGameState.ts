import GameState from "../../../../../GameState";
import CombatGameState, {HouseCombatData} from "../CombatGameState";
import Player from "../../../../Player";
import House from "../../../../game-data-structure/House";
import * as _ from "lodash";
import ChooseCasualtiesGameState, {SerializedChooseCasualtiesGameState} from "./choose-casualties-game-state/ChooseCasualtiesGameState";
import Game from "../../../../game-data-structure/Game";
import World from "../../../../game-data-structure/World";
import HouseCard, {HouseCardState} from "../../../../game-data-structure/house-card/HouseCard";
import Region from "../../../../game-data-structure/Region";
import Unit from "../../../../game-data-structure/Unit";
import {ClientMessage} from "../../../../../../messages/ClientMessage";
import {ServerMessage} from "../../../../../../messages/ServerMessage";
import AfterWinnerDeterminationGameState
    , {SerializedAfterWinnerDeterminationGameState} from "./after-winner-determination-game-state/AfterWinnerDeterminationGameState";
import AfterCombatHouseCardAbilitiesGameState
    , {SerializedAfterCombatHouseCardAbilitiesGameState} from "./after-combat-house-card-abilities-game-state/AfterCombatHouseCardAbilitiesGameState";
import ResolveRetreatGameState, {SerializedResolveRetreatGameState} from "./resolve-retreat-game-state/ResolveRetreatGameState";

export default class PostCombatGameState extends GameState<
    CombatGameState,
    ResolveRetreatGameState | ChooseCasualtiesGameState | AfterWinnerDeterminationGameState
    | AfterCombatHouseCardAbilitiesGameState
> {
    winner: House;
    loser: House;

    get combat(): CombatGameState {
        return this.parentGameState;
    }

    get game(): Game {
        return this.combat.game;
    }

    get world(): World {
        return this.game.world;
    }

    get attacker(): House {
        return this.combat.attacker;
    }

    get defender(): House {
        return this.combat.defender;
    }

    get loserCombatData(): HouseCombatData {
        return this.combat.houseCombatDatas.get(this.loser);
    }

    get winnerCombatData(): HouseCombatData {
        return this.combat.houseCombatDatas.get(this.winner);
    }

    firstStart(): void {
        // Final combat strength can't be negative but only attacker is able to generate a negative final combat strength
        const attackerTotalStrength = Math.max(this.combat.getTotalCombatStrength(this.attacker), 0);
        const defenderTotalStrength = this.combat.getTotalCombatStrength(this.defender);

        this.winner = attackerTotalStrength > defenderTotalStrength
            ? this.attacker
            : defenderTotalStrength > attackerTotalStrength
                ? this.defender
                : this.game.whoIsAheadInTrack(this.game.fiefdomsTrack, this.attacker, this.defender);
        this.loser = this.winner == this.attacker ? this.defender : this.attacker;

        this.combat.ingameGameState.log({
            type: "combat-result",
            winner: this.winner.id,
            stats: [this.attacker, this.defender].map(h => {
                const houseCard = this.combat.houseCombatDatas.get(h).houseCard;

                return {
                    house: h.id,
                    region: this.combat.houseCombatDatas.get(h).region.id,
                    army: this.combat.getBaseCombatStrength(h),
                    armyUnits: this.combat.houseCombatDatas.get(h).army.map(u => u.type.id),
                    orderBonus: this.combat.getOrderBonus(h),
                    support: this.combat.getSupportStrengthForSide(h),
                    garrison: this.combat.getGarrisonCombatStrength(h),
                    houseCard: houseCard ? houseCard.id : null,
                    houseCardStrength: this.combat.getHouseCardCombatStrength(h),
                    valyrianSteelBlade: this.combat.getValyrianBladeBonus(h),
                    total: Math.max(this.combat.getTotalCombatStrength(h), 0)
                }
            })
        });

        this.proceedCasualties();
    }

    onChooseCasualtiesGameStateEnd(region: Region, selectedCasualties: Unit[]): void {
        this.combat.ingameGameState.log(
            {
                type: "killed-after-combat",
                house: this.loser.id,
                killed: selectedCasualties.map(u => u.type.id)
            }
        );

        // Remove the selected casualties
        selectedCasualties.forEach(u => region.units.delete(u.id));
        // Remove them from the house combat datas
        const loserCombatData = this.combat.houseCombatDatas.get(this.loser);
        loserCombatData.army = _.without(loserCombatData.army, ...selectedCasualties);

        this.entireGame.broadcastToClients({
            type: "combat-change-army",
            region: region.id,
            house: this.loser.id,
            army: loserCombatData.army.map(u => u.id)
        });

        this.entireGame.broadcastToClients({
            type: "remove-units",
            regionId: region.id,
            unitIds: selectedCasualties.map(u => u.id)
        });

        this.proceedHouseCardHandling();
    }

    proceedCasualties(): void {
        // If there was a defeated garrison, remove it
        if (this.loser == this.combat.defender && this.combat.defendingRegion.garrison > 0) {
            this.combat.defendingRegion.garrison = 0;

            this.entireGame.broadcastToClients({
                type: "change-garrison",
                region: this.combat.defendingRegion.id,
                newGarrison: 0
            });
        }

        const locationLoserArmy = this.attacker == this.loser ? this.combat.attackingRegion : this.combat.defendingRegion;
        const loserArmy = this.attacker == this.loser ? this.combat.attackingArmy : this.combat.defendingArmy;

        const winnerSwordIcons = this.attacker == this.winner
            ? this.combat.getHouseCardSwordIcons(this.attacker)
            : this.combat.getHouseCardSwordIcons(this.defender);
        const loserTowerIcons = this.attacker == this.loser
            ? this.combat.getHouseCardTowerIcons(this.attacker)
            : this.combat.getHouseCardTowerIcons(this.defender);

        // All units of the loser army that can't retreat or are wounded are immediately killed
        const immediatelyKilledLoserUnits = loserArmy.filter(u => u.wounded || !u.type.canRetreat);

        if (immediatelyKilledLoserUnits.length > 0) {
            this.combat.ingameGameState.log(
                {
                    type: "immediatly-killed-after-combat",
                    house: this.loser.id,
                    killedBecauseWounded: immediatelyKilledLoserUnits.filter(u => u.wounded).map(u => u.type.id),
                    killedBecauseCantRetreat: immediatelyKilledLoserUnits.filter(u => !u.type.canRetreat).map(u => u.type.id)
                }
            );

            immediatelyKilledLoserUnits.forEach(u => locationLoserArmy.units.delete(u.id));
            this.loserCombatData.army = _.difference(this.loserCombatData.army, immediatelyKilledLoserUnits);

            // TODO: This packet should be replaced by RemoveUnits
            this.entireGame.broadcastToClients({
                type: "combat-immediately-killed-units",
                regionId: locationLoserArmy.id,
                unitIds: immediatelyKilledLoserUnits.map(u => u.id)
            });

            this.entireGame.broadcastToClients({
                type: "combat-change-army",
                house: this.loser.id,
                region: locationLoserArmy.id,
                army: this.loserCombatData.army.map(u => u.id)
            });
        }

        const loserArmyLeft = _.difference(loserArmy, immediatelyKilledLoserUnits);
        const maxLoserCasualtiesCount = Math.max(0, winnerSwordIcons - loserTowerIcons);
        const loserCasualtiesCount = Math.min(maxLoserCasualtiesCount, loserArmyLeft.length);

        if (loserCasualtiesCount > 0) {
            // Check if casualties are prevented this combat
            if (!this.combat.areCasulatiesPrevented(this.loser)) {
                if (loserCasualtiesCount < loserArmyLeft.length) {
                    this.setChildGameState(new ChooseCasualtiesGameState(this)).firstStart(this.loser, loserArmyLeft, loserCasualtiesCount);
                } else {
                    // If the count of casualties is bigger or equal than the remaining army, a ChooseCasualtiesGameSTate
                    // is not needed. The army left can be exterminated.
                    this.onChooseCasualtiesGameStateEnd(locationLoserArmy, loserArmyLeft);
                }
                return;
            }
        }

        this.proceedHouseCardHandling();
    }

    proceedHouseCardHandling(): void {
        // Put the house cards as used
        this.combat.houseCombatDatas.forEach(({houseCard}, house) => this.markHouseAsUsed(house, houseCard));

        this.proceedAfterWinnerDetermination();
    }

    proceedAfterWinnerDetermination(): void {
        // Do abilities
        this.setChildGameState(new AfterWinnerDeterminationGameState(this)).firstStart();
    }

    onAfterWinnerDeterminationFinish(): void {
        this.proceedRetreat();
    }

    proceedRetreat(): void {
        // A retreat is only triggered if, after resolving casualties, there are
        // remaining troops in the loser's army.
        if (this.combat.houseCombatDatas.get(this.loser).army.length > 0) {
            this.setChildGameState(new ResolveRetreatGameState(this))
                .firstStart();
            return;
        }

        this.onResolveRetreatFinish();
    }

    onResolveRetreatFinish(): void {
        this.proceedEndOfCombat();
    }

    onPlayerMessage(player: Player, message: ClientMessage): void {
        this.childGameState.onPlayerMessage(player, message);
    }

    onServerMessage(message: ServerMessage): void {
        this.childGameState.onServerMessage(message);
    }

    proceedEndOfCombat(): void {
        if (this.winner == this.attacker) {
            // Check if the attacker still has an army. All attacking units might have
            // been killed during the combat.
            if (this.combat.attackingArmy.length > 0) {
                // It might be that this movement can be prevented by house cards (e.g. Arianne Martell)
                if (!this.isAttackingArmyMovementPrevented()) {
                    this.combat.resolveMarchOrderGameState.moveUnits(this.combat.attackingRegion, this.combat.attackingArmy, this.combat.defendingRegion);
                }
            }
            this.removeOrderFromRegion(this.combat.defendingRegion);
        }

        // Remove the order from attacking region
        this.removeOrderFromRegion(this.combat.attackingRegion);

        this.setChildGameState(new AfterCombatHouseCardAbilitiesGameState(this)).firstStart();
    }

    removeOrderFromRegion(region: Region): void {
        // Always check if there is an order to be removed as e.g. Arianne or Loras might lead to an orphaned order
        if (this.combat.actionGameState.ordersOnBoard.has(region)) {
            this.combat.actionGameState.ordersOnBoard.delete(region);
            this.entireGame.broadcastToClients({
                type: "action-phase-change-order",
                region: region.id,
                order: null
            });
        }
    }

    isAttackingArmyMovementPrevented(): boolean {
        return this.combat.getOrderResolutionHouseCard().reduce((s, h) => {
            const houseCard = this.combat.houseCombatDatas.get(h).houseCard;

            if (houseCard == null) {
                return s;
            }

            return houseCard.ability ? s || houseCard.ability.doesPreventAttackingArmyFromMoving(this, h, houseCard) : s;
        }, false);
    }

    onAfterCombatHouseCardAbilitiesFinish(): void {
        this.combat.resolveMarchOrderGameState.onResolveSingleMarchOrderGameStateFinish(this.attacker);
    }

    markHouseAsUsed(house: House, houseCard: HouseCard | null): void {
        if (houseCard) {
            houseCard.state = HouseCardState.USED;

            this.entireGame.broadcastToClients({
                type: "change-state-house-card",
                houseId: house.id,
                cardIds: [houseCard.id],
                state: HouseCardState.USED
            });
        }

        // If all cards are used or discarded, put all used as available,
        // except the one that has been used.
        if (house.houseCards.values.every(hc => hc.state == HouseCardState.USED || hc.state == HouseCardState.DISCARDED)) {
            const houseCardsToMakeAvailable = house.houseCards.values
                .filter(hc => hc != houseCard)
                .filter(hc => hc.state == HouseCardState.USED);

            houseCardsToMakeAvailable.forEach(hc => hc.state = HouseCardState.AVAILABLE);

            this.entireGame.broadcastToClients({
                type: "change-state-house-card",
                houseId: house.id,
                cardIds: houseCardsToMakeAvailable.map(hc => hc.id),
                state: HouseCardState.AVAILABLE
            });
        }
    }

    serializeToClient(admin: boolean, player: Player | null): SerializedPostCombatGameState {
        return {
            type: "post-combat",
            winner: this.winner.id,
            loser: this.loser.id,
            childGameState: this.childGameState.serializeToClient(admin, player)
        };
    }

    static deserializeFromServer(combat: CombatGameState, data: SerializedPostCombatGameState): PostCombatGameState {
        const postCombat = new PostCombatGameState(combat);

        postCombat.winner = combat.game.houses.get(data.winner);
        postCombat.loser = combat.game.houses.get(data.loser);
        postCombat.childGameState = postCombat.deserializeChildGameState(data.childGameState);

        return postCombat;
    }

    deserializeChildGameState(data: SerializedPostCombatGameState["childGameState"]): PostCombatGameState["childGameState"] {
        switch (data.type) {
            case "resolve-retreat":
                return ResolveRetreatGameState.deserializeFromServer(this, data);
            case "choose-casualties":
                return ChooseCasualtiesGameState.deserializeFromServer(this, data);
            case "after-winner-determination":
                return AfterWinnerDeterminationGameState.deserializeFromServer(this, data);
            case "after-combat-house-card-abilities":
                return AfterCombatHouseCardAbilitiesGameState.deserializeFromServer(this, data);
        }
    }
}

export interface SerializedPostCombatGameState {
    type: "post-combat";
    winner: string;
    loser: string;
    childGameState: SerializedResolveRetreatGameState
        | SerializedChooseCasualtiesGameState
        | SerializedAfterWinnerDeterminationGameState
        | SerializedAfterCombatHouseCardAbilitiesGameState;
}
