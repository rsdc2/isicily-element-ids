
/**
 * Convert a string to its upper case equivalent
 * @param {string} s 
 * @returns 
 */

const toUpper = (s) => s.toUpperCase() 

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

// /** 
//  * @param {Iterable.<HTMLInputElement>} l
//  * @returns {string}: the ID of the currently selected radio element
//  */

// const currentlySelected = (l) => {
//     /**
//      * @param {string} acc
//      * @param {HTMLInputElement} v
//      */
//     const f = (acc, v) => {
//         if (acc !== "") {
//             return acc
//         }

//         if (v.checked) {
//             return v.id
//         }
//     }

//     return Array.from(l).reduce(f, "")
// }

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
