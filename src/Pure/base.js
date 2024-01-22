
import { Arr } from "./arr.js"
import Validate from "./validate.js"
import Constants from "./constants.js"

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
     * Return the underlying array of base characters
     */
    get baseChars() {
        return this.#baseChars
    }

    /**
     * Convert a value in the base of "baseVal" to a decimal
     * @param {string} baseVal   
     * @param {Array.<string>} base 
     * @returns {bigint}
     */

    static baseToDec(baseVal, base) {
        const chars = Arr.strToArr(baseVal)

        /**
         * 
         * @param {bigint} acc 
         * @param {string} baseVal 
         * @param {number} idx 
         * @param {Array.<string>} chars
         * @returns {bigint}
         */
        const getDecValue = (acc, baseVal, idx, chars) => {
            const reverseIdx = chars.length - 1 - idx // Start at the right end
            return acc + BigInt(base.indexOf(baseVal)) * BigInt(base.length ** reverseIdx)
        }

        return chars.reduce(getDecValue, 0n)
    }   


    /**
     * Convert a decimal value to a value in the base of the 
     * current object
     * @param {string} baseVal 
     * @returns {bigint}
     */
    baseToDec(baseVal) {
        return Base.baseToDec(baseVal, this.baseChars)
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
            const dec = oldbase.baseToDec(value)
            return newbase.decToBase(dec)    
        }

        return inner
    }
    
    /**
     * Convert a decimal value to a value in the base passed
     * as the baseChars parameter
     * @param {bigint} dec
     * @param {Array.<string>} baseChars
     * @returns {string}
     */
    static decToBase(dec, baseChars) {
        
        const base = BigInt(baseChars.length)

        /**
         * @param {bigint} i
         * @returns {Array.<bigint>}
         */
        function f(i) {

            const q = i / base
            const r = i % base

            if (q == 0n) {
                return [r]
            }
            return q < base ? [q, r] : [...f(q), r]
        }

        const l = f(dec).map( value => baseChars[Number(value)] )
        return l.join("")

    }

    /**
     * Convert a decimal value to a value in the base of the 
     * current object
     * @param {bigint} dec 
     * @returns {string}
     */
    decToBase(dec) {
        return Base.decToBase(dec, this.baseChars)
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
            console.error("Invalid base")
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

    static midPointBetweenValues(val1, val2, baseChars) {
        if (!Validate.longID(val1) && !Validate.shortID(val1)) {
            return FIVEBLANKS
        }

        if (!Validate.longID(val2) && !Validate.shortID(val2)) {
            return FIVEBLANKS
        }

        const baseVal1Dec = Base.baseToDec(val1, baseChars)
        const baseVal2Dec = Base.baseToDec(val2, baseChars)

        if (baseVal1Dec > baseVal2Dec) {
            return FIVEBLANKS
        }

        if (baseVal1Dec === baseVal2Dec) {
            return FIVEBLANKS
        }

        if (baseVal1Dec === baseVal2Dec + 1n || baseVal1Dec === baseVal2Dec - 1n) {
            return FIVEBLANKS
        }

        const mid = (baseVal1Dec + baseVal2Dec) / 2n
        return Base.decToBase(mid, baseChars)
    }

    /**
     * 
     * @param {string} val1 
     * @param {string} val2 
     */
    midPointBetweenValues(val1, val2) {
        return Base.midPointBetweenValues(val1, val2, this.#baseChars)
    }

    /**
     * Get the zeroth element of the base
     */
    get zero() {
        return this.#baseChars[0]
    }

}


