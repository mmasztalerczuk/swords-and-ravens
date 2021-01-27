import HouseCardAbility from "./HouseCardAbility";
import HouseCard from "./HouseCard";
import House from "../House";
import CombatGameState from "../../action-game-state/resolve-march-order-game-state/combat-game-state/CombatGameState";

export default class RayderHouseCardAbility extends HouseCardAbility {

    finalCombatStrength(combat: CombatGameState, houseCard: HouseCard, affectedHouseCard: HouseCard, strength: number) {
        var a = houseCard != affectedHouseCard ? strength : combat.game.wildlingStrength
        console.log(`${houseCard.name} ${a}`);
        return a;
    }
}