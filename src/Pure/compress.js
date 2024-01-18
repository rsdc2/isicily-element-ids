import Bases from "./bases.js"
import Format from "./format.js"

export default class Compress {

    /**
     * Compresses a full ISicily token ID
     * @param {string} isicID
     * @param {string[]} base
     * @returns {string}
     */
    static compressID(isicID, base) {
        const noISicPadding = Format.removeISic(isicID)
        const bigint = BigInt(noISicPadding)
        const converted = Bases.decToBase(bigint, base)
        const padded = Format.padShortID(base, converted)
        return Format.underlineGreek(padded)
    }

    /**
     * Decompress a compressed ID.
     * Assumes that any HTML formatting has been removed
     * @param {string} isicID 
     * @param {string[]} base
     * @returns {string}
     */
    static decompressID(isicID, base) {
        const decompressed = Bases.baseToDec(isicID, base)
        const asString = String(decompressed)
        const isicPadding = Format.insertISic(asString)
        return isicPadding
    }

}