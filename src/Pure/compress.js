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
     * 
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

            if (oldbase.index == 100) {
                const newRaw = raw.slice(0, 6) + raw.slice(7, 11)
                const newISic = Format.insertISic(newRaw, 52)
                return Compress.compressID(newbase)(newISic)
            }
            else if (oldbase.index == 52) {
                const newRaw = raw.slice(0, 6) + "0" + raw.slice(6, 10)
                const newISic = Format.insertISic(newRaw, 100)
                return Format.removeUnderline(Compress.compressID(newbase)(newISic))
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
         * @param {string} isicID 
         * @returns {string}
         */
        function inner(isicID) {
            const decompressed = base.baseToDec(isicID)
            const asString = String(decompressed)
            const isicPadding = Format.insertISic(asString, base.index)
            return isicPadding
        }

        return inner
    }

}