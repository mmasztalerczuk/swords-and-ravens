import HouseCardAbility from "./HouseCardAbility";
import AfterWinnerDeterminationGameState
    from "../../action-game-state/resolve-march-order-game-state/combat-game-state/post-combat-game-state/after-winner-determination-game-state/AfterWinnerDeterminationGameState";
import House from "../House";
import HouseCard from "./HouseCard";
import SerIlynPayneAbilityGameState
    from "../../action-game-state/resolve-march-order-game-state/combat-game-state/post-combat-game-state/after-winner-determination-game-state/ser-ilyn-payne-ability-game-state/SerIlynPayneAbilityGameState";

export default class SerIlynPayneAbility extends HouseCardAbility {

    afterWinnerDetermination(afterWinnerDetermination: AfterWinnerDeterminationGameState, house: House, _houseCard: HouseCard): void {
        console.log("Elo");
        if (afterWinnerDetermination.postCombatGameState.winner == house) {
            console.log("TEST31132123");
            afterWinnerDetermination.childGameState
                .setChildGameState(new SerIlynPayneAbilityGameState(afterWinnerDetermination.childGameState))
                .firstStart(house);
            return;
        }
        console.log("Sad Elo");
        afterWinnerDetermination.childGameState.onHouseCardResolutionFinish(house);
    }
}
