import Format from "./format.js"
import Constants from "./constants.js"

export default class Validate {
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
     * @returns 
     */
    static iSicilyElemID(s) {
        const m = s.match(/^[0-9]{5,5}$/)
        return m != null
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

    static longIdNonStrict = (x) => Validate.isDecimal(Format.removeISic(x))

    /**
     * Returns true if @param s is a valid short ISicily element ID
     * @param {string} s
     * @returns {boolean} 
     */

    static shortIDStrict(s) {
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

    static longID = Constants.STRICT ? Validate.longIDStrict : Validate.longIdNonStrict
    static shortID = Constants.STRICT ? Validate.shortIDStrict : Validate.shortIdNonStrict

    /**
     * @param {HTMLDivElement | HTMLSpanElement} elem
     */
    static validate = elem => {
        const text = elem.textContent

        if (text == null) return false

        const {longID: validateLongID, shortID: validateShortID} = Validate

        return validateLongID(text) 
                || validateShortID(text) 
                || validateLongID(text.replace(/[= ]/g, ""))
    }


}
