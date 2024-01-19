import Format from "../../src/Pure/format.js"

/**
 * @callback randomString
 * @returns {string} 
 */

/**
 * Generate a random I.Sicily token ID
 * @param {number} baseIdx The number of the base, e.g. 10 for decimal
 */
export function randomISicID(baseIdx) {

    function inner() {
        const rand = Math.random()
        const isicNum = rand * 1e10
        const bigint = BigInt(Math.floor(isicNum))
        const s = String(bigint)
        return Format.padAndInsertISic(s, baseIdx)
    }

    return inner
}

/**
 * Generate a triple consisting of two instances of a random
 * number as a string, and a name
 * @param {number} max
 * @param {randomString} callback
 */
export function randomTuples(max, callback) {
    const arr = []
    for (let i=0; i < max; i++) {
        const rand = callback()
        arr.push(/** @type{[string, string, string]} */ ([rand, rand, `Random ${rand}`]))
    }
    return arr
}