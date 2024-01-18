import Format from "../../src/Pure/format.js"

/**
 * @callback randomString
 * @returns {string} 
 */


/**
 * Generate a random I.Sicily token ID
 * @returns {string}
 */
export function randomISicID() {
    const rand = Math.random()
    const isicNum = rand * 1e10
    const bigint = BigInt(Math.floor(isicNum))
    const s = String(bigint)
    return Format.insertISic(s)
}

/**
 * 
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