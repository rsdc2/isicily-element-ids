import Base from "./base.js"
import Format from "./format.js"
import Validator from "./validator.js"
import Constants  from "./constants/constants.js"
import { BaseValueError } from "./errors.js"

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
            const converted = base.toBase(dec)
            const padded = Format.padShortID(base.zero, converted) 
            return padded
        }

        return inner
    }

    /**
     * 
     * @param {Base} base 
     */
    static compressIDFormatted(base) {
        /**
         * 
         * @param {string} isicID
         * @returns {HTMLSpanElement} 
         */
        function inner(isicID) {
            const compressed = Compress.compressID(base)(isicID)
            const formatted = Format.highlightGreekFromStr(compressed)
            return formatted            

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

            // if (compressedID.length !== 5) {
            //     throw new BaseValueError(
            //         "Compressed ID has the wrong length: " +
            //         "should be 5 characters"
            //     )
            // }

            const decompressed = base.toDec(compressedID).toString()
            return Format.padAndInsertISic(decompressed, base.index)
        }

        return inner
    }

}