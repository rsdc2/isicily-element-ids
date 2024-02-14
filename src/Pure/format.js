import Constants from "./constants/constants.js"
import { BaseIndexError } from "../Errors/base.js"


export default class Format {

    /**
     * Pads a string of digits and 
     * inserts string elements into a number corresponding to an
     * ISicily ID + 4 or 5 digit element id
     * @param {string} s 
     * @param {number} baseIdx
     * @returns {string}
     */

    static padAndInsertISic(s, baseIdx) {
        if (baseIdx === 100) {
            const padded = s.padStart(11, '0')
            return "ISic" + padded.slice(0, 6) + "-" + padded.slice(6, 11)    
        } 
        else if (baseIdx === 52) {
            const padded = s.padStart(10, '0')
            return "ISic" + padded.slice(0, 6) + "-" + padded.slice(6, 10)    
        }
        else {
            throw new BaseIndexError(baseIdx)
        }
        
    }

    /**
     * Pads out a short ID with zero value for that base
     * @param {string} zero
     * @param {string} s 
     * @returns {string}
     */

    static padShortID = (zero, s) => s.padStart(5, zero)

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
     * @returns {HTMLSpanElement} an HTML string with Greek characters surrounded by <u> tags
     */
    static highlightGreekFromStr = (s) => {
        const span = document.createElement("span")
        const {GREEKCHARSET} = Constants

        const chars = Array.from(s)
        chars.forEach(
            (char) => {
                if (GREEKCHARSET.includes(char)) {
                    const strong = document.createElement("strong")
                    strong.textContent = char
                    span.append(strong)
                } else {
                    span.append(char)
                }
            }
        )

        return span
        
    }


}
