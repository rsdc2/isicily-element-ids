import Base from "./base.js"
import Format from "./format.js"
import Validator from "./validator.js"
import Constants  from "./constants.js"

export default class Compress {    

    /**
     * Compresses a full ISicily token ID
     * @param {Base} base
     */
    static compressID(base) {

        /**
         * Inner function that does the conversion
         * @param {string} isicID 
         * @returns {string}
         */
        function inner(isicID) {
            const noISicPadding = Format.removeISic(isicID)
            const dec = BigInt(noISicPadding)
            const converted = base.decToBase(dec)
            const padded = Format.padShortID(base.zero, converted)
            return Format.underlineGreek(padded)    
        }

        return inner
    }

    /**
     * Decompress a compressed ID.
     * Assumes that any HTML formatting has been removed
     * @param {Base} base
     */
    static decompressID(base) {

        /**
         * 
         * @param {string} compressedID 
         * @returns {string}
         */
        function inner(compressedID) {
            const decompressed = base.baseToDec(compressedID).toString()
            return Format.padAndInsertISic(decompressed, base.index)
        }

        return inner
    }

}