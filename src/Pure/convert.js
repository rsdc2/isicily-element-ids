import Base from "./base.js"
import Format from "./format.js"
import Validator from "./validator.js"
import Compress from "./compress.js"
import { BaseIndexError, BaseLengthError, BaseValueError } from "./errors.js"

export default class Convert {    


    /**
     * Convert a compressed ID in one base to a compressed ID
     * in another.
     * At present, only Base52 and Base100 are supported.
     * @param {Base} oldbase 
     * @param {Base} newbase 
     */
    static ID(oldbase, newbase) {

        /**
         * Compressed value
         * @param {string} value 
         */
        function inner(value) {

            let valid = false;

            if (!Validator.length(value)) {
                throw new BaseLengthError(value)
            }

            if (oldbase.index === 100 
                && newbase.index === 52
                && oldbase.baseToDec(value) > 380204031) {

                throw new BaseValueError(
                    `${value} is too large to be ` + 
                    `converted to Base ${newbase.index}`
                )
            }

            if (oldbase.index === 100) {
                valid = Validator.containsOnlyLetters(value)
            }
            else if (oldbase.index === 52) {
                valid = Validator.containsOnlyLatinLetters(value)
            }
            else {
                throw new BaseIndexError(oldbase.index)
            }

            if (!valid) {
                throw new BaseValueError(
                    `${value} is invalid ` +
                    `in base ${oldbase}`
                )
            }

            const decompressed = Compress.decompressID(oldbase)(value)
            const noUnderline = Format.removeUnderline(decompressed)
            const raw = Format.removeISic(noUnderline)

            // Check that has an equivalent value in the new base
            if (raw[6] !== "0" && newbase.index === 52) {
                throw new BaseValueError(
                    `${value} cannot be converted ` +
                    `to an ID in ${newbase.index} ` +
                    `because ${decompressed} has an element ID which is ` +
                    `greater than 9999.`
                )
            } 

            if (oldbase.index === 100 && newbase.index === 52) {
                const newRaw = raw.slice(0, 6) + raw.slice(7, 11)
                const newISic = Format.padAndInsertISic(newRaw, 52)
                return Compress.compressID(newbase)(newISic)
            }
            else if (oldbase.index == 52 && newbase.index === 100) {
                const newRaw = raw.slice(0, 6) + "0" + raw.slice(6, 10)
                const newISic = Format.padAndInsertISic(newRaw, 100)
                const compressed = Compress.compressID(newbase)(newISic)
                return Format.removeUnderline(compressed)
            }

        }

        return inner
    }

    /**
     * Convert an array of compressed IDs in one base to a compressed ID
     * in another.
     * At present, only Base52 and Base100 are supported.
     * @param {Base} oldbase 
     * @param {Base} newbase 
     */
    static IDs(oldbase, newbase) {

        const convert = Convert.ID(oldbase, newbase)

        /**
         * 
         * @param {string[]} ids 
         */
        function inner(ids) {
            return ids.map( (id) => convert(id) )
        }

        return inner
    }


}