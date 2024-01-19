
import { Arr } from "./arr.js"
import Validate from "./validate.js"
import Constants from "./constants.js"

const { FIVEBLANKS } = Constants

export default class Base {
    
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
     * Finds the midpoint between two values in a given base
     * @param {string} val1 
     * @param {string} val2 
     * @param {Array.<string>} baseChars
     * @returns {string}
     */

    static midPointBetweenValues(val1, val2, baseChars) {
        if (!Validate.validateLongID(val1) && !Validate.validateShortID(val1)) {
            return FIVEBLANKS
        }

        if (!Validate.validateLongID(val2) && !Validate.validateShortID(val2)) {
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

}


