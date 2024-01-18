import Bases from "./bases.js"
import Format from "./format.js"

export default class Compress {

    /**
     * Compresses a full ISicily token ID
     * @param {string} isicID
     * @returns {string}
     */
    static compressID(isicID) {
        const noISicPadding = Format.removeISic(isicID)
        const bigint = BigInt(noISicPadding)
        const converted = Bases.decToBase(bigint, Bases.CURRENTBASE)
        const padded = Format.padShortID(Bases.CURRENTBASE, converted)
        return Format.underlineGreek(padded)
    }

    /**
     * Decompress a compressed ID.
     * Assumes that any HTML formatting has been removed
     * @param {string} isicID 
     * @returns {string}
     */
    static decompressID(isicID) {
        const decompressed = Bases.baseToDec(isicID, Bases.CURRENTBASE)
        const asString = String(decompressed)
        const isicPadding = Format.insertISic(asString)
        return isicPadding
    }

}