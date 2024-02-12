import Format from "./format.js"
import Constants from "./constants/constants.js"

export default class Validator {
    /**
     * Returns true if a string contains only digits
     * 0-9
     * @param {string} s 
     */
    static containsNumerals = s => {
        const matches = s.match(/[0-9]/g) 
        return matches !== null
    }

    
    /**
     * Returns true if a string contains only 
     * Latin letters
     * @param {string} s 
     */
    static containsOnlyLatinLetters = s => {
        const matches = s.match(/^[a-zA-Z]+$/g) 
        return matches !== null
    }

    /**
     * Returns true if a string contains only Greek or 
     * Latin letters
     * @param {string} s 
     */
    static containsOnlyLetters = s => {
        const matches = s.match(/^[a-zA-Zα-ωΑ-Ω]+$/g) 
        return matches !== null
    }


    /**
     * Returns true if a string contains special characters
     * @param {string} s 
     */
    static containsSpecial = s => {
        const matches = s.match(/[./+-;:\[\]\{\}]/g) 
        return matches !== null
    }

    /**
     * Returns true if the string is composed only of 
     * characters 0-9
     * @param {string} s 
     * @returns {boolean}
     */
    static isDecimal = (s) => {
        
        const matches = s.match(/^[0-9]+$/g)

        if (matches == null || matches.length === 0) {
            return false
        }
        
        return true
    }

    /**
     * Validates an I.Sicily document ID
     * @param {string} s 
     */
    static iSicilyDocID(s) {
        const m = s.match(/^ISic0[0-9]{5,5}$/)
        return m != null
    }

    /**
     * 
     * @param {string} s 
     * @returns {boolean}
     */
    static iSicilyElemID(s) {
        const m = s.match(/^[0-9]{5,5}$/)
        return m != null
    }

    /**
     * 
     * @param {string} s 
     */
    static length(s) {
        return s.length === 5
    }


    /**
     * Returns true if @param s is a valid I.Sicily element ID
     * @param {string} s
     * @returns {boolean} 
     */

    static longIDStrict(s) {
        const m = s.match(/^ISic0[0-9]{5,5}-[0-9]{5,5}$/)
        return m != null
    }

    /**
     * Returns true if the initial part of the string is consistent
     * with a long ID
     * @param {string} s 
     */
    static partialLongID(s) {
        const m = s.match(/^ISic0/)
        return m != null
    }

    /**
     * 
     * @param {string} x 
     * @returns {boolean}
     */

    static longIdNonStrict = (x) => Validator.isDecimal(Format.removeISic(x))

    /**
     * Returns true if input string is a valid short ISicily element ID
     * @param {string} s
     * @returns {boolean} 
     */

    static shortIDBase100Strict(s) {
        const m = s.match(/^[A-Za-zΑ-Ωα-ω]{5,5}$/)
        return m != null
    }

    /**
     * Returns true if @param s is a valid short ISicily element ID
     * @param {string} s
     * @returns {boolean} 
     */
    static shortIdNonStrict(s) {
        const m = s.match(/^[A-Za-zΑ-Ωα-ω]+$/)
        return m != null
    }

    static longID = Constants.STRICT ? Validator.longIDStrict : Validator.longIdNonStrict
    static shortID = Constants.STRICT ? Validator.shortIDBase100Strict : Validator.shortIdNonStrict

    /**
     * @param {HTMLDivElement | HTMLSpanElement} elem
     */
    static validate = elem => {
        const text = elem.textContent

        if (text == null) return false

        const {longID: validateLongID, shortID: validateShortID} = Validator

        return validateLongID(text) 
                || validateShortID(text) 
                || validateLongID(text.replace(/[= ]/g, ""))
    }


}
