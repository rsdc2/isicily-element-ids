const BASE52 = UPPERCASELATIN.concat(LOWERCASELATIN)

const BASE100 = BASE52.concat(UPPERCASEGREEK)
                      .concat(LOWERCASEGREEK)


/**
 * Convert a decimal value to a value in the base passed
 * as the baseChars parameter
 * @param {bigint} dec
 * @param {Array.<string>} baseChars
 * @returns {string}
 */
function decToBase(dec, baseChars) {
    
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
        return (q < base ? [q, r] : [...f(q), r])
    }

    const l = f(dec).map( (value) => baseChars[Number(value)] )
    return l.join("")

}

/**
 * Convert a value in the base of @param base to a decimal
 * @param {string} baseVal   
 * @param {Array.<string>} base 
 * @returns {bigint}
 */

function baseToDec(baseVal, base) {
    const chars = strToArr(baseVal)

    /**
     * 
     * @param {bigint} acc 
     * @param {string} v 
     * @param {number} idx 
     * @returns {bigint}
     */
    const getDecValue = (acc, v, idx) => 
        acc + BigInt(base.indexOf(v)) * BigInt(Math.pow(base.length, idx))

    return chars.reduceRight(getDecValue, 0n)
}


/**
 * Finds the midpoint between two values in a given base
 * @param {string} val1 
 * @param {string} val2 
 * @param {Array.<string>} baseChars
 * @returns {string}
 */

function midPointBetweenValues(val1, val2, baseChars) {
    const baseVal1Dec = baseToDec(val1, baseChars)
    const baseVal2Dec = baseToDec(val2, baseChars)
    const mid = (baseVal1Dec + baseVal2Dec) / 2n
    return decToBase(mid, baseChars)
}
