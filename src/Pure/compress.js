import Bases from "./bases.js"
import Format from "./formatting.js"

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
        const greekFormatted = Format.formatGreek(padded)

        return greekFormatted
    }

    /**
     * Decompress a compressed ID
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