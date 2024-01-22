import Base from "./base.js"
import Format from "./format.js"
import Validate from "./validate.js"
import Constants  from "./constants.js"
import Compress from "./compress.js"

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
            // Validation
            if (oldbase.index === 100) {
                valid = Validate.containsOnlyLetters(value)
            } 
            else if (oldbase.index === 52) {
                valid = Validate.containsOnlyLatinLetters(value)
            }

            if (!valid) {
                console.error(`${value} not a valid compressed ID`)
                return Constants.FIVEBLANKS
            }

            const decompressed = Compress.decompressID(oldbase)(value)
            const noUnderline = Format.removeUnderline(decompressed)
            const raw = Format.removeISic(noUnderline)

            if (oldbase.index === 100 && newbase.index === 52) {
                const newRaw = raw.slice(0, 6) + raw.slice(7, 11)
                const newISic = Format.padAndInsertISic(newRaw, 52)
                return Compress.compressID(newbase)(newISic)
            }
            else if (oldbase.index == 52 && newbase.index === 100) {
                const newRaw = raw.slice(0, 6) + "0" + raw.slice(6, 10)
                const newISic = Format.padAndInsertISic(newRaw, 100)
                return Format.removeUnderline(Compress.compressID(newbase)(newISic))
            }
            else {
                console.error(
                    `Base ${oldbase.index} not valid: only Base 52 ` +  
                    `and Base 100 are currently supported.`
                )

                return Constants.FIVEBLANKS
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