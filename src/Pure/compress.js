import Base from "./base.js"
import { ConversionError } from "../Errors/conversion.js"
import Format from "./format.js"
import Validator from "./validator.js"

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

            Validator.assertNotCompressedID(isicID, base)
            Validator.assertLongID(isicID, base)

            const noISicPadding = Format.removeISic(isicID)
            const dec = Number(noISicPadding)
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
     * Assumes that any HTML formatting has been removed.
     * @param {Base} base
     */
    static decompressID(base) {

        /**
         * Asserts that compressedID is a valid partial ID
         * @param {string} compressedID 
         * @returns {string}
         */
        function inner(compressedID) {
            Validator.assertPartialCompressedID(compressedID, base)

            const decompressed = base.toDec(compressedID).toString()
            return Format.padAndInsertISic(decompressed, base.index)
        }

        return inner
    }

}