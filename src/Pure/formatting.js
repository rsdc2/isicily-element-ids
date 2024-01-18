
import Bases from "./bases.js"

export default class Format {

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

    /**
     * 
     * @param {string} s 
     * @returns {string}
     */
    static formatGreek = (s) => {
        return s.replace(/([α-ωΑ-Ω]+)/g, "<u>$1</u>")
    }

    /**
     * Inserts string elements into a number corresponding to an
     * ISicily ID + 5 digit element id
     * @param {string} s 
     * @returns {string}
     */

    static insertISic(s) {
        const s_ = s.padStart(11, '0')
        return "ISic" + s_.slice(0, 6) + "-" + s_.slice(6, 11)
    }

    /**
     * Pads out a short ID with zero value for that base
     * @param {Array.<string>} base
     * @param {string} s 
     * @returns {string}
     */

    static padShortID = (base, s) => s.padStart(5, Bases.zero(base))

    /**
     * Removes string elements from a number corresponding to an
     * ISicily ID + 5 digit element id
     * @param {string} s 
     * @returns {string}
     */
    static removeISic = (s) => {
        return s.replace("ISic", "").replace("-", "")
    }
}

