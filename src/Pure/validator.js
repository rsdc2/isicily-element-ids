
import { ConversionError, ValidationError } from "./errors.js"
import Base from "./base.js"

export default class Validator {
    /**
     * 
     * @param {string} s 
     * @param {Base} base
     */
    static assertFullCompressedID(s, base) {
        if (!Validator.shortID(s, base)) {
            throw new ValidationError(
                `"${s}" is not a valid compressed ID in base ${base.index}.`
            )
        }
    }

    /**
     * 
     * @param {string} s 
     * @param {Base} base
     */
    static assertPartialCompressedID(s, base) {
        if (!Validator.partialShortID(s, base)) {
            throw new ValidationError(
                `"${s}" is not a valid part of a compressed ID in base ${base.index}.`
            )
        }
    }

    /**
     * 
     * @param {string} s 
     * @param {Base} base
     */
    static assertLongID(s, base) {
        if (!Validator.longID(s, base)) {
            throw new ValidationError(
                `"${s}" is not a valid expanded I.Sicily element ID.`
            )
        }
    }

    /**
     * 
     * @param {string} s 
     * @param {Base} base
     */
    static assertNotCompressedID(s, base) {
        if (Validator.shortID(s, base)) {
            throw new ValidationError(
                `"${s}" is already compressed.`
            )
        }
    }

    /**
     * 
     * @param {string} s 
     * @param {Base} base
     */
    static assertShortID(s, base) {
        if (!Validator.shortID(s, base)) {
            throw new ValidationError(
                `"${s}" is not a valid compressed I.Sicily element ID.`
            )
        }
    }

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
     * @param {Base} base
     * @returns {boolean}
     */
    static iSicilyElemID(s, base) {
        let m = null;
        if (base.index === 100) {
            m = s.match(/^[0-9]{5,5}$/)
        } else if (base.index === 52) {
            m = s.match(/^[0-9]{4,4}$/)
        }
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
     * @param {Base} base
     * @returns {boolean} 
     */

    static longID(s, base) {
        let m = null;
        if (base.index == 100) {
            m = s.match(/^ISic0[0-9]{5,5}-[0-9]{5,5}$/)
        } else if (base.index == 52) {
            m = s.match(/^ISic0[0-9]{5,5}-[0-9]{4,4}$/)
        }
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
     * Returns true if the initial part of the string is consistent
     * with a long ID
     * @param {string} s 
     * @param {Base} base
     */
    static partialShortID(s, base) {
        let m = null;
        if (base.index === 100) {
            m = s.match(/^[A-Za-zΑ-Ωα-ω]{0,5}/)
        } else if (base.index === 52) {
            m = s.match(/^[A-Za-zΑ-Ωα-ω]{0,4}/)
        }
        return m != null
    }

    /**
     * Returns true if input string is a valid short ISicily element ID
     * @param {string} s
     * @returns {boolean} 
     */

    /**
     * 
     * @param {string} s 
     * @param {Base} base 
     * @returns 
     */
    static shortID(s, base) {
        let m = null;
        if (base.index === 100) {
            m = s.match(/^[A-Za-zΑ-Ωα-ω]{5,5}$/)
        } else if (base.index === 52) {
            m = s.match(/^[A-Za-z]{5,5}$/)
        }
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

    /**
     * @param {HTMLDivElement | HTMLSpanElement} elem
     * @param {Base} base
     */
    static validate = (elem, base) => {
        const text = elem.textContent

        if (text == null) return false

        const {longID, shortID} = Validator

        return longID(text, base) 
                || shortID(text, base) 
                || longID(text.replace(/[= ]/g, ""), base)
    }


}
