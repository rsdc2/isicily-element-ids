import Base from "./base.js"
import Format from "./format.js"

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
     * Convert a compressed ID in one base to a compressed ID
     * in another.
     * At present, only Base52 and Base100 are supported.
     * @param {Base} oldbase 
     * @param {Base} newbase 
     */
    static convert(oldbase, newbase) {

        /**
         * Compressed value
         * @param {string} value 
         */
        function inner(value) {
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
            }
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