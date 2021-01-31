import BetterMap from "../utils/BetterMap";
import aeronImage from "../../public/images/house-cards/Aeron.png";
import alesterImage from "../../public/images/house-cards/Alester.png";
import aeroImage from "../../public/images/house-cards/Areo.png";
import arianneImage from "../../public/images/house-cards/Arianne.png";
import ashaImage from "../../public/images/house-cards/Asha.png";
import balonImage from "../../public/images/house-cards/Balon.png";
import blackfishImage from "../../public/images/house-cards/Blackfish.png";
import brienneImage from "../../public/images/house-cards/Brienne.png";
import catelynImage from "../../public/images/house-cards/Catelyn.png";
import cerseiImage from "../../public/images/house-cards/Cersei.png";
import dagmarImage from "../../public/images/house-cards/Dagmar.png";
import darkStarImage from "../../public/images/house-cards/DarkStar.png";
import davosImage from "../../public/images/house-cards/Davos.png";
import doranImage from "../../public/images/house-cards/Doran.png";
import eddardImage from "../../public/images/house-cards/Eddard.png";
import euronImage from "../../public/images/house-cards/Euron.png";
import garlanImage from "../../public/images/house-cards/Garlan.png";
import greatjonImage from "../../public/images/house-cards/Greatjon.png";
import gregorImage from "../../public/images/house-cards/Gregor.png";
import houndImage from "../../public/images/house-cards/Hound.png";
import jaimeImage from "../../public/images/house-cards/Jaime.png";
import kevanImage from "../../public/images/house-cards/Kevan.png";
import lorasImage from "../../public/images/house-cards/Loras.png";
import maceImage from "../../public/images/house-cards/Mace.png";
import margaeryImage from "../../public/images/house-cards/Margaery.png";
import melisandreImage from "../../public/images/house-cards/Melisandre.png";
import nymeriaImage from "../../public/images/house-cards/Nymeria.png";
import obaraImage from "../../public/images/house-cards/Obara.png";
import patchfaceImage from "../../public/images/house-cards/Patchface.png";
import queenImage from "../../public/images/house-cards/Queen.png";
import randyllImage from "../../public/images/house-cards/Randyll.png";
import redViperImage from "../../public/images/house-cards/RedViper.png";
import renlyImage from "../../public/images/house-cards/Renly.png";
import robbImage from "../../public/images/house-cards/Robb.png";
import rodrickImage from "../../public/images/house-cards/Rodrick.png";
import rooseImage from "../../public/images/house-cards/Roose.png";
import salladhorImage from "../../public/images/house-cards/Salladhor.png";
import stannisImage from "../../public/images/house-cards/Stannis.png";
import theonImage from "../../public/images/house-cards/Theon.png";
import tyrionImage from "../../public/images/house-cards/Tyrion.png";
import tywinImage from "../../public/images/house-cards/Tywin.png";
import victorianImage from "../../public/images/house-cards/Victorian.png";
import rayderImage from "../../public/images/house-cards/Rayder.png";
import melisandreDwDImage from "../../public/images/house-cards/Melisandre_DwD.png";
import jonSnow from "../../public/images/house-cards/JonSnow.png";
import stannisDwDImage from "../../public/images/house-cards/StannisBaratheonDwD.png";
import aeronDwDImage from "../../public/images/house-cards/AeronDamphairDwD.png";
import qarlTheMaidImage from "../../public/images/house-cards/QarlTheMaid.png";
import rodrikTheReaderImage from "../../public/images/house-cards/RodrikTheReader.png";
import euronDwDImage from "../../public/images/house-cards/EuronCrowsEye.png";
import qyburnImage from "../../public/images/house-cards/Qyburn.png";
import serAddamMarbrandImage from "../../public/images/house-cards/SerAddamMarbrand.png";
import serIlynPayneImage from "../../public/images/house-cards/SerIlynPayne.png";

const houseCardImages = new BetterMap([
    ["queen-of-thorns", queenImage],
    ["aeron-damphair", aeronImage],
    ["alester-florent", alesterImage],
    ["arianne-martell", arianneImage],
    ["areo-hotah", aeroImage],
    ["asha-greyjoy", ashaImage],
    ["balon-greyjoy", balonImage],
    ["the-blackfish", blackfishImage],
    ["brienne-of-tarth", brienneImage],
    ["catelyn-stark", catelynImage],
    ["cersei-lannister", cerseiImage],
    ["dagmar-cleftjaw", dagmarImage],
    ["darkstar", darkStarImage],
    ["ser-davos-seaworth", davosImage],
    ["doran-martell", doranImage],
    ["eddard-stark", eddardImage],
    ["euron-crows-eye", euronImage],
    ["ser-garlan-tyrell", garlanImage],
    ["greatjon-umber", greatjonImage],
    ["ser-gregor-clegane", gregorImage],
    ["the-hound", houndImage],
    ["ser-jaime-lannister", jaimeImage],
    ["ser-kevan-lannister", kevanImage],
    ["ser-loras-tyrell", lorasImage],
    ["mace-tyrell", maceImage],
    ["margaery-tyrell", margaeryImage],
    ["melisandre", melisandreImage],
    ["nymeria-sand", nymeriaImage],
    ["obara-sand", obaraImage],
    ["patchface", patchfaceImage],
    ["queen-of-thorns", queenImage],
    ["randyll-tarly", randyllImage],
    ["the-red-viper", redViperImage],
    ["renly-baratheon", renlyImage],
    ["robb-stark", robbImage],
    ["ser-rodrick-cassel", rodrickImage],
    ["roose-bolton", rooseImage],
    ["salladhor-saan", salladhorImage],
    ["stannis-baratheon", stannisImage],
    ["theon-greyjoy", theonImage],
    ["tyrion-lannister", tyrionImage],
    ["tywin-lannister", tywinImage],
    ["victarion-greyjoy", victorianImage],
    ["rayder", rayderImage],
    ["melisandre-dwd", melisandreDwDImage],
    ["jon-snow", jonSnow],
    ["stannis-baratheon-dwd", stannisDwDImage],
    ["aeron-damphair-dwd", aeronDwDImage],
    ["qarl-the-maid", qarlTheMaidImage],
    ["rodrik-the-reader", rodrikTheReaderImage],
    ["euron-crows-eye-dwd", euronDwDImage],
    ["qyburn", qyburnImage],
    ["ser-addam-marbrand", serAddamMarbrandImage],
    ["ser-ilyn-payne", serIlynPayneImage],
]);

export default houseCardImages;
