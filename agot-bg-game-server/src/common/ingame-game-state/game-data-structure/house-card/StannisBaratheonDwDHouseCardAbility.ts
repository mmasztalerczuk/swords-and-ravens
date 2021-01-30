import HouseCardAbility from "./HouseCardAbility";
import House from "../House";
import HouseCard from "./HouseCard";
import CancelHouseCardAbilitiesGameState
    from "../../action-game-state/resolve-march-order-game-state/combat-game-state/cancel-house-card-abilities-game-state/CancelHouseCardAbilitiesGameState";

export default class StannisBaratheonDwDHouseCardAbility extends HouseCardAbility {

    cancel(cancelResolutionState: CancelHouseCardAbilitiesGameState, house: House, _houseCard: HouseCard): void {
        let actionGameState = cancelResolutionState.combatGameState.actionGameState;
        let combatGameState = cancelResolutionState.combatGameState;
        let game = cancelResolutionState.game
        if (cancelResolutionState.combatGameState.supporters.entries.every(([_supporter, supportee]) => supportee != house)) {
            console.log("a");
            const regions = game.world.getNeighbouringRegions(combatGameState.defendingRegion)
                                .filter(r => actionGameState.ordersOnBoard.has(r))
                                .map(r => ({r, o: actionGameState.ordersOnBoard.get(r)}))
                                .filter(({o}) => o.type.id == 'support' || o.type.id == 'support-plus-one')
                                .map(({r}) => r);
            console.log("b");
            regions.forEach(r => cancelResolutionState.combatGameState.actionGameState.ordersOnBoard.delete(r));
            console.log("c");
            console.log("d");    
            regions.forEach(r => {
                cancelResolutionState.combatGameState.actionGameState.entireGame.broadcastToClients({
                    type: "action-phase-change-order",
                    region: r.id,
                    order: null
                })
            });
            console.log("e");

        } else {
            console.log("nothing to remove");
            // nic do usuniecia
            // this.ingame.log({
            //     type: "queen-of-thorns-no-order-available",
            //     house: house.id,
            //     affectedHouse: this.combatGameState.getEnemy(house).id
            // });
        }
        cancelResolutionState.onHouseCardResolutionFinish();
    }
}
