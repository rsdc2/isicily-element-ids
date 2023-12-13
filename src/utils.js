
/**
 * @template T
 * @param {T} val
 * @returns {T}
 */

const identity = (val) => val

/**
 * Returns true if the string is composed only of 
 * characters 0-9
 * @param {string} s 
 * @returns {boolean}
 */
const isDecimal = (s) => {
    
    const matches = s.match(/[0-9]+/g)

    if (matches == null || matches.length === 0) {
        return false
    }
    
    return s
        .match(/[0-9]+/g)[0]
        .length == s.length
}

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
