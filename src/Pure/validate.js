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
     * 
     * @param {string} s 
     */
    static validateISicilyNumber(s) {
        const m = s.match(/^ISic0[0-9]{5,5}$/)
        return m != null
    }

    /**
     * 
     * @param {string} s 
     * @returns 
     */
    static validateISicilyTokenNumber(s) {
        const m = s.match(/^[0-9]{5,5}$/)
        return m != null
    }


    /**
     * Returns true if @param s is a valid I.Sicily element ID
     * @param {string} s
     * @returns {boolean} 
     */

    static validateLongIDStrict(s) {
        const m = s.match(/^ISic0[0-9]{5,5}-[0-9]{5,5}$/)
        return m != null
    }

    /**
     * Returns true if the initial part of the string is consistent
     * with a long ID
     * @param {string} s 
     */
    static validatePartialLongID(s) {
        const m = s.match(/^ISic0/)
        return m != null
    }

    /**
     * 
     * @param {string} x 
     * @returns {boolean}
     */

    static validateLongIdNonStrict = (x) => Validate.isDecimal(Format.removeISic(x))

    /**
     * Returns true if @param s is a valid short ISicily element ID
     * @param {string} s
     * @returns {boolean} 
     */

    static validateShortIDStrict(s) {
        const m = s.match(/^[A-Za-zΑ-Ωα-ω]{5,5}$/)
        return m != null
    }

    /**
     * Returns true if @param s is a valid short ISicily element ID
     * @param {string} s
     * @returns {boolean} 
     */
    static validateShortIdNonStrict(s) {
        const m = s.match(/^[A-Za-zΑ-Ωα-ω]+$/)
        return m != null
    }

    static validateLongID = Constants.STRICT ? Validate.validateLongIDStrict : Validate.validateLongIdNonStrict
    static validateShortID = Constants.STRICT ? Validate.validateShortIDStrict : Validate.validateShortIdNonStrict

    /**
     * @param {HTMLDivElement | HTMLSpanElement} elem
     */
    static validate = elem => Validate.validateLongID(elem.textContent) || 
                                Validate.validateShortID(elem.textContent) ||
                                Validate.validateLongID(elem.textContent.replace(/[= ]/g, ""))


}
