/**
 * Inserts string elements into a number corresponding to an
 * ISicily ID + 5 digit element id
 * @param {string} s 
 * @returns {string}
 */

function insertISic(s) {
    const s_ = s.padStart(10, '0')
    return "ISic" + s_.slice(0, 5) + "-" + s_.slice(5, 10)
}