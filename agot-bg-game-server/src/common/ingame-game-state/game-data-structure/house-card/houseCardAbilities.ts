import HouseCardAbility from "./HouseCardAbility";
import BetterMap from "../../../../utils/BetterMap";
import TheonGreyjoyHouseCardAbility from "./TheonGreyjoyHouseCardAbility";
import SerDavosSeaworthHouseCardAbility from "./SerDavosSeaworthHouseCardAbility";
import RenlyBaratheonHouseCardAbility from "./RenlyBaratheonHouseCardAbility";
import TywinLannisterHouseCardAbility from "./TywinLannisterHouseCardAbility";
import SalladhorSaanHouseCardAbility from "./SalladhorSaanHouseCardAbility";
import AshaGreyjoyHouseCardAbilities from "./AshaGreyjoyHouseCardAbilities";
import QueenOfThornsHouseCardAbility from "./QueenOfThornsHouseCardAbility";
import VictarionGreyjoyHouseCardAbility from "./VictarionGreyjoyHouseCardAbility";
import BalonGreyjoyHouseCardAbility from "./BalonGreyjoyHouseCardAbility";
import DoranMartellHouseCardAbility from "./DoranMartellHouseCardAbility";
import PatchfaceHouseCardAbility from "./PatchfaceHouseCardAbility";
import SerLorasTyrellHouseCardAbility from "./SerLorasTyrellHouseCardAbility";
import StannisBaratheonHouseCardAbility from "./StannisBaratheonHouseCardAbility";
import NymeriaSandHouseCardAbility from "./NymeriaSandHouseCardAbility";
import RooseBoltonHouseCardAbility from "./RooseBoltonHouseCardAbility";
import TyrionLannisterHouseCardAbility from "./TyrionLannisterHouseCardAbility";
import SerKevanLannisterHouseCardAbility from "./SerKevanLannisterHouseCardAbility";
import CatelynStarkHouseCardAbility from "./CatelynStarkHouseCardAbility";
import AeronDamphairHouseCardAbility from "./AeronDamphairHouseCardAbility";
import ArianneMartellHouseCardAbility from "./ArianneMartellHouseCardAbility";
import MaceTyrellHouseCardAbility from "./MaceTyrellHouseCardAbility";
import CerseiLannisterHouseCardAbility from "./CerseiLannisterHouseCardAbility";
import TheBlackfishHouseCardAbility from "./TheBlackfishHouseCardAbility";
import RobbStarkHouseCardAbility from "./RobbStarkHouseCardAbility";
import RayderHouseCardAbility from "./RayderHouseCardAbility";
import MelisandreHouseCardAbility from "./MelisandreHouseCardAbility";
import JonSnowBaratheonHouseCardAbility from "./JonSnowBaratheonHouseCardAbility";
import StannisBaratheonDwDHouseCardAbility from "./StannisBaratheonDwDHouseCardAbility";
import AeronDamphairDwDHouseCardAbility from "./AeronDamphairDwDHouseCardAbility";
import QarlTheMaidAbility from "./QarlTheMaidHouseCardAbility";
import RodrikTheReaderAbility from "./RodrikTheReaderCardAbility";
import EuronCrowsEyeDwDAbility from "./EuronCrowsEyeDwDCardAbility";
import QyburnAbility from "./QyburnAbility";
import SerAddamMarbrandAbility from "./SerAddamMarbrandAbility";
import SerIlynPayneAbility from "./SerIlynPayneAbility";
import QuentynMartellAbility from "./QuentynMartellAbility";
import SerGerrisDrinkwaterAbility from "./SerGerrisDrinkwaterAbility";
import DoranMartellAbility from "./DoranMartellDwDAbility";
import WalderFreyAbility from "./WalderFreyHouseCardAbility";
import ReekAbility from "./ReekHouseCardAbility";
import RamsayBoltonAbility from "./RamsayBoltonHouseCardAbility";
import QueenOfThornsDwDAbility from "./QueenOfThornsDwDHouseCardAbility";
import PaxterRedwyneAbility from "./PaxterRedwyneHouseCardAbility";
import MargaeryTyrellDwDAbility from "./MargaeryTyrellDwDAbilityHouseCardAbility";

export const theonGreyjoy = new TheonGreyjoyHouseCardAbility(
    "theon-greyjoy",
    "If you are defending an area that contains either a Stronghold or a Castle,"
    + " this card gains +1 combat strength and a sword icon."
);
export const serDavosSeaworth = new SerDavosSeaworthHouseCardAbility(
    "ser-davos-seaworth",
    "If your \"Stannis Baratheon\", House card is in your discard pile, this card"
    + " gains +1 combat strength and a sword icon."
);
export const renlyBaratheon = new RenlyBaratheonHouseCardAbility(
    "renly-baratheon",
    "If you win this combat, you may upgrade one of your participating Footmen" +
    + " (or one supporting Baratheon Footmen) to a Knight."
);
export const tywinLannister = new TywinLannisterHouseCardAbility(
    "tywin-lannister",
    "If you win this combat, gain two Power tokens."
);
export const salladhorSaan = new SalladhorSaanHouseCardAbility(
    "salladhor-saan",
    "If you are being supported in this combat, the combat strength of all"
    + "non-Baratheon ships is reduced to zero."
);
export const ashaGreyjoy = new AshaGreyjoyHouseCardAbilities(
    "asha-greyjoy",
    "If you are not being supported in this combat, this card gains"
    + " two sword icons and one fortification icon."
);
export const queenOfThorns = new QueenOfThornsHouseCardAbility(
    "queen-of-thorns",
    "Immediately remove one of your opponent's Order tokens in any one area"
    + " adjacent to the embattled area. You may not remove the March Order token"
    + " used to start this combat."
);
export const victarionGreyjoy = new VictarionGreyjoyHouseCardAbility(
    "victarion-greyjoy",
    "If you are attacking, all of you participating Ships (including"
     + " supporting Greyjoy Ships) add +2 to combat strength instead of +1."
);
export const balonGreyjoy = new BalonGreyjoyHouseCardAbility(
    "balon-greyjoy",
    "The printed combat strength of your opponent's House card is reduced to 0."
);
export const doranMartell = new DoranMartellHouseCardAbility(
    "doran-martell",
    "Immediately move your opponent to the bottom of one Influence track of your choice."
);
export const patchface = new PatchfaceHouseCardAbility(
    "patchface",
    "After combat, you may look at your opponent's hand and discard one card of your choice."
);
export const serLorasTyrell = new SerLorasTyrellHouseCardAbility(
    "ser-loras-tyrell",
    "If you are attacking and win this combat, move the March Order token into the conquered area"
    + " (instead of discarding it). The March Order token may be resolved again later this round."
);
export const stannisBaratheon = new StannisBaratheonHouseCardAbility(
    "stannis-baratheon",
    "If your opponent has a higher position on the Iron Throne Influence track than you,"
    + " this card gains +1 combat strength."
);
export const nymeriaSand = new NymeriaSandHouseCardAbility(
    "nymeria-sand",
    "If you are defending, this card gains a fortification icon."
    + " If you are attacking, this card gains a sword icon."
);
export const rooseBolton = new RooseBoltonHouseCardAbility(
    "roose-bolton",
    "If you lose this combat, return your entire House card discard pile into your hand"
    + " (including this card)."
);
export const tyrionLannister = new TyrionLannisterHouseCardAbility(
    "tyrion-lannister",
    "You may immediately cancel your opponent's chosen House card and return it to his hand. He"
    + " must then choose a different House card to reveal, if he has no other House cards in hand, he"
    + " cannot use a House card this combat."
);
export const serKevanLannister = new SerKevanLannisterHouseCardAbility(
    "ser-kevan-lannister",
    "If you are attacking, all of your participating Footmen (including supporting"
    + " Lannister footmen) add +2 combat strength instead of +1."
);
export const catelynStark = new CatelynStarkHouseCardAbility(
    "catelyn-stark",
    "If you have a Defense Order token in the embattled area, its value is doubled."
);
export const aeronDamphair = new AeronDamphairHouseCardAbility(
    "aeron-damphair",
    "You may immediately discard two of your available Power tokens to discard Aeron"
    + " Damphair and choose a different House card from your hand (if able)"
);
export const arianneMartell = new ArianneMartellHouseCardAbility(
    "arianne-martell",
    "If you are defending and lose this combat, your opponent may not move his units into the embattled area."
    + " They return to the area from which they marched. Your own units must still retreat."
);
export const maceTyrell = new MaceTyrellHouseCardAbility(
    "mace-tyrell",
    "Immediately destroy one of your opponent's attacking or defending Footmen units."
);
export const cerseiLannister = new CerseiLannisterHouseCardAbility(
    "cersei-lannister",
    "If you win this combat, you may remove of the losing opponent's"
    + " Order tokens from anywhere on the board."
);
export const theBlackfish = new TheBlackfishHouseCardAbility(
    "the-blackfish",
    "You do not take casualties in this combat from"
    + " House card abilities, Combat icons, or Tides of Battles cards."
);
export const robbStark = new RobbStarkHouseCardAbility(
    "robb-stark",
    "If you win this combat, you may choose the area to which your opponent's retreats."
    + " You must choose a legal area where your opponent loses the fewest units."
);
export const rayder = new RayderHouseCardAbility(
    "rayder",
    "Your final combat strength is equal to the current position of the Wildling Threat token."
);
export const melisandre = new MelisandreHouseCardAbility(
    "melisandre",
    "After combat, you may return any House card in your discard pile (including this card)"
    + " to your hand by discarding a number of your available Power tokens equal to the printed combat strength of that card."
);
export const jonSnow = new JonSnowBaratheonHouseCardAbility(
    "jon-snow",
    "If you win this combat, you may decrease of increase the Wildling track by one space"
    + " (to a minimum of 0 and a maximum of 10)"
);
export const stannisBaratheonDwD = new StannisBaratheonDwDHouseCardAbility(
    "stannis-baratheon-dwd",
    "If you are not being supported in this combat, remove all Support orders (including your own)"
    + " adjecent to the embattled area, canceling any supporting strength they may have been providing."
);
export const aeronDamphairDwD = new AeronDamphairDwDHouseCardAbility(
    "aeron-damphair-dwd",
    "You may discard any number of your available Power tokens to increase the combat strength"
    + "  of this card by the number of Power tokens discarded."
);
export const qarlTheMaid = new QarlTheMaidAbility(
    "qarl-the-maid",
    "If you are attacking and lose this combat, gain three Power tokens."
);
export const rodrikTheReader = new RodrikTheReaderAbility(
    "rodrik-the-reader",
    "If you win this combat, you may search any Westeros deck for a card of your choice."
    + " Shuffle the remaining cards and place the chosen card facedown on top of the deck."
);
export const euronCrowsEyeDwd = new EuronCrowsEyeDwDAbility(
    "euron-crows-eye-dwd",
    "If your opponent has a higher position on the Fiefdoms Influence track than you, this card gains +1 combat strength."
);
export const qyburn = new QyburnAbility(
    "qyburn",
    "You may discard two of your avaiable Power tokens to choose a House card in any players' discard pile."
    + " Qyburn gains the printed combat, strength and combat icons of that card, ignoring its text ability."
);
export const serAddamMarbrand = new SerAddamMarbrandAbility(
    "ser-addam-marbrand",
    "If you are attacking, all of your participating Knights (including supporting Lannister Knights) add +3"
    + " combat strength instead of +2."
);
export const serIlynPayne = new SerIlynPayneAbility(
    "ser-ilyn-payne",
    "If you win this combat, you may destroy one of your opponent's Footman in any area (in addition to normal casualties)."
    + " If that unit is the last unit in its area, remove any Order token there as well."
);
export const quentynMartell = new QuentynMartellAbility(
    "quentyn-martell",
    "For each House card in your discard pile, this card gains +1 combat strength."
);
export const serGerrisDrinkwater = new SerGerrisDrinkwaterAbility(
    "ser-gerris-drinkwater",
    "If you win this combat, you may move one position higher on one Influence track of your choice."
);
export const doranMartellDwD = new DoranMartellAbility(
    "doran-martell-dwd",
    "For each House card in your hand, this card gains a firtificaton icon and a sword icon, and suffers -1 combat"
    + " strength (to a minimum of 0)."
);
export const walderFrey = new WalderFreyAbility(
    "walder-frey",
    "Any player (other than your opponent) who grants support to your opponent must grant that support to you instead."
);
export const reek = new ReekAbility(
    "reek",
    "If your 'Ramsay Bolton' House card is in your discard pile, immediately return it to your hand."
    + " If you lose this combat, you may return Reek to your hand)."
);
export const ramsayBolton = new RamsayBoltonAbility(
    "ramsay-bolton",
    "If your 'Reek' House card is still in your hand, this card gains +1 combat strength and three sword icons."
);
export const queenOfThornsDwD = new QueenOfThornsDwDAbility(
    "queen-of-thorns-dwd",
    "Ignore all text abilities printed on your opponent's House card"
);
export const paxterRedwyne = new PaxterRedwyneAbility(
    "paxter-redwyne",
    "If the embattled area is a sea area, all of your paricipating Ships (including supporting Tyrell Ships)"
    + " add +2 combat strength instead of +1."
);
export const margaeryTyrellDwD = new MargaeryTyrellDwDAbility(
    "margaery-tyrell-dwd",
    "If you are defending your home area or an area that contains one of your Power tokens, "
    + " your opponents' final combat strength is 2."
);


const houseCardAbilities = new BetterMap<string, HouseCardAbility>([
    [theonGreyjoy.id, theonGreyjoy],
    [serDavosSeaworth.id, serDavosSeaworth],
    [renlyBaratheon.id, renlyBaratheon],
    [tywinLannister.id, tywinLannister],
    [salladhorSaan.id, salladhorSaan],
    [ashaGreyjoy.id, ashaGreyjoy],
    [queenOfThorns.id, queenOfThorns],
    [victarionGreyjoy.id, victarionGreyjoy],
    [balonGreyjoy.id, balonGreyjoy],
    [doranMartell.id, doranMartell],
    [patchface.id, patchface],
    [serLorasTyrell.id, serLorasTyrell],
    [stannisBaratheon.id, stannisBaratheon],
    [nymeriaSand.id, nymeriaSand],
    [rooseBolton.id, rooseBolton],
    [tyrionLannister.id, tyrionLannister],
    [serKevanLannister.id, serKevanLannister],
    [catelynStark.id, catelynStark],
    [aeronDamphair.id, aeronDamphair],
    [arianneMartell.id, arianneMartell],
    [maceTyrell.id, maceTyrell],
    [cerseiLannister.id, cerseiLannister],
    [theBlackfish.id, theBlackfish],
    [robbStark.id, robbStark],
    [rayder.id, rayder],
    [melisandre.id, melisandre],
    [jonSnow.id, jonSnow],
    [stannisBaratheonDwD.id, stannisBaratheonDwD],
    [aeronDamphairDwD.id, aeronDamphairDwD],
    [qarlTheMaid.id, qarlTheMaid],
    [rodrikTheReader.id, rodrikTheReader],
    [euronCrowsEyeDwd.id, euronCrowsEyeDwd],
    [qyburn.id, qyburn],
    [serAddamMarbrand.id, serAddamMarbrand],
    [serIlynPayne.id, serIlynPayne],
    [quentynMartell.id, quentynMartell],
    [serGerrisDrinkwater.id, serGerrisDrinkwater],
    [doranMartellDwD.id, doranMartellDwD],
    [reek.id, reek],
    [walderFrey.id, walderFrey],
    [ramsayBolton.id, ramsayBolton],
    [queenOfThornsDwD.id, queenOfThornsDwD],
    [paxterRedwyne.id, paxterRedwyne],
    [margaeryTyrellDwD.id, margaeryTyrellDwD],
]);

export default houseCardAbilities;
