
import { Arr } from "./arr.js"
import Validator from "./validator.js"
import Constants from "./constants/constants.js"
import { BaseIndexError } from "./errors.js"


const { FIVEBLANKS } = Constants

export default class Base {

    #baseChars
    #length

    /**
     * 
     * @param {string[]} baseChars 
     */
    constructor(baseChars) {
        this.#baseChars = baseChars
        this.#length = baseChars.length
    }

    /**
     * Add a decimal value to the base
     * @param {number} valueToAdd decimal value to add
     * @param {string} baseVal base value to be added to
     * @returns {string}
     */
    addDec(valueToAdd, baseVal) {
        const decval = this.toDec(baseVal)
        const added = decval + valueToAdd
        return this.toBase(added)
    }   

    /**
     * Return the underlying array of base characters
     */
    get baseChars() {
        return this.#baseChars
    }

    /**
     * Convert a string value from one base into another
     * @param {Base} oldbase 
     * @param {Base} newbase 
     */
    static convert(oldbase, newbase) {
        /**
         * 
         * @param {string} value 
         * @returns {string}
         */
        function inner(value) {
            const dec = oldbase.toDec(value)
            return newbase.toBase(dec)    
        }

        return inner
    }
    

    /**
     * Return a new base object
     * @param {string[]} baseChars 
     */
    static fromBaseChars(baseChars) {
        return new Base(baseChars)
    }

    /**
     * Create a new Base object from a string representation
     * of the base index
     * @param {"52"|"100"} idx 
     */
    static fromBaseIdx(idx) {
        if (idx === "52") {
            return Base.fromBaseChars(Constants.BASE52)
        }
        else if (idx === "100") {
            return Base.fromBaseChars(Constants.BASE100)
        }
        else {
            throw new BaseIndexError(idx)
        }
    }


    /**
     * Get the number of the base, e.g. 10 for decimal
     */
    get index() {
        return this.#length
    }
    
    /**
     * Finds the midpoint between two values in a given base.
     * Return ????? if midpoint cannot be found for some reason.
     * 
     * @param {string} val1 
     * @param {string} val2 
     * @param {Array.<string>} baseChars
     * @returns {string}
     */

    static midPoint(val1, val2, baseChars) {
        const base = Base.fromBaseChars(baseChars)
        if (!Validator.longID(val1, base) && !Validator.shortID(val1, base)) {
            return FIVEBLANKS
        }

        if (!Validator.longID(val2, base) && !Validator.shortID(val2, base)) {
            return FIVEBLANKS
        }

        const baseVal1Dec = Base.toDec(val1, baseChars)
        const baseVal2Dec = Base.toDec(val2, baseChars)

        if (baseVal1Dec > baseVal2Dec) {
            return FIVEBLANKS
        }

        if (baseVal1Dec === baseVal2Dec) {
            return FIVEBLANKS
        }

        if (baseVal1Dec === baseVal2Dec + 1 || baseVal1Dec === baseVal2Dec - 1) {
            return FIVEBLANKS
        }

        const mid = (baseVal1Dec + baseVal2Dec) / 2
        return Base.toBase(mid, baseChars)
    }

    /**
     * 
     * @param {string} val1 
     * @param {string} val2 
     */
    midPointBetweenValues(val1, val2) {
        return Base.midPoint(val1, val2, this.#baseChars)
    }

    /**
     * Convert a decimal value to a value in the base passed
     * as the baseChars parameter
     * @param {number} dec
     * @param {Array.<string>} baseChars
     * @returns {string}
     */
    static toBase(dec, baseChars) {
        
        const base = baseChars.length

        /**
         * @param {number} i
         * @returns {Array.<number>}
         */
        function f(i) {

            const q = Math.floor(i / base)
            const r = i % base

            if (q == 0) {
                return [r]
            }
            return q < base ? [q, r] : [...f(q), r]
        }

        const l = f(dec).map( value => baseChars[value] )
        return l.join("")

    }

    /**
     * Convert a decimal value to a value in the base of the 
     * current object
     * @param {number} dec 
     * @returns {string}
     */
    toBase(dec) {
        return Base.toBase(dec, this.baseChars)
    }

    /**
     * Convert a value in the base of "baseVal" to a decimal
     * @param {string} baseVal   
     * @param {Array.<string>} base 
     * @returns {number}
     */

    static toDec(baseVal, base) {
        const chars = Arr.fromString(baseVal)

        /**
         * 
         * @param {number} acc 
         * @param {string} baseVal 
         * @param {number} idx 
         * @param {Array.<string>} chars
         * @returns {number}
         */
        const getDecValue = (acc, baseVal, idx, chars) => {
            const reverseIdx = chars.length - 1 - idx // Start at the right end
            return acc + base.indexOf(baseVal) * base.length ** reverseIdx
        }

        return chars.reduce(getDecValue, 0)
    }   


    /**
     * Convert a decimal value to a value in the base of the 
     * current object
     * @param {string} baseVal 
     * @returns {number}
     */
    toDec(baseVal) {
        return Base.toDec(baseVal, this.baseChars)
    }

    /**
     * Get the zeroth element of the base
     */
    get zero() {
        return this.#baseChars[0]
    }
}


