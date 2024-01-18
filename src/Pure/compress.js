import Bases from "./bases.js"
import Format from "./format.js"

export default class Compress {

    /**
     * Compresses a full ISicily token ID
     * @param {string[]} base
     */
    static compressID(base) {

        /**
         * Inner function that does the conversion
         * @param {string} isicID 
         * @returns {string}
         */
        function inner(isicID) {
            const noISicPadding = Format.removeISic(isicID)
            const bigint = BigInt(noISicPadding)
            const converted = Bases.decToBase(bigint, base)
            const padded = Format.padShortID(base, converted)
            return Format.underlineGreek(padded)    
        }

        return inner
    }

    /**
     * Decompress a compressed ID.
     * Assumes that any HTML formatting has been removed
     * @param {string[]} base
     */
    static decompressID(base) {

        /**
         * 
         * @param {string} isicID 
         * @returns {string}
         */
        function inner(isicID) {
            const decompressed = Bases.baseToDec(isicID, base)
            const asString = String(decompressed)
            const isicPadding = Format.insertISic(asString)
            return isicPadding
        }

        return inner
    }

}