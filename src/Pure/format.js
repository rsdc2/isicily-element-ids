
import Bases from "./bases.js"

export default class Format {

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
     * ISicily ID + 4 or 5 digit element id
     * @param {string} s 
     * @returns {string}
     */
    static removeISic = (s) => {
        return s.replace("ISic", "").replace("-", "")
    }

    /**
     * Removes underlining from Greek characters
     * @param {string} s 
     * @returns 
     */
    static removeUnderline (s) {
        return s.replace(/\<\/?u\>/g, "")
    }

    /**
     * Underline Greek characters
     * @param {string} s 
     * @returns {string} an HTML string with Greek characters surrounded by <u> tags
     */
    static underlineGreek = (s) => {
        return s.replace(/([α-ωΑ-Ω]+)/g, "<u>$1</u>")
    }
}

