
/**
 * @template T
 * @param {T} val
 * @returns {T}
 */

const identity = (val) => val

/**
 * Convert a string to an array of characters
 * @param {string} s
 * @returns {Array.<string>}
 */
const strToArr = (s) => {
    let arr = []

    for (let i = 0; i < s.length; i++) {
        arr = arr.concat([s[i]])
    }

    return arr
}

/**
 * Convert a string to its upper case equivalent
 * @param {string} s 
 * @returns 
 */

const toUpper = (s) => s.toUpperCase() 
