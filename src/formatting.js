/**
 * Inserts string elements into a number corresponding to an
 * ISicily ID + 5 digit element id
 * @param {string} s 
 * @returns {string}
 */

function insertISic(s) {
    const s_ = s.padStart(11, '0')
    return "ISic" + s_.slice(0, 6) + "-" + s_.slice(6, 11)
}

/**
 * Removes string elements from a number corresponding to an
 * ISicily ID + 5 digit element id
 * @param {string} s 
 * @returns {string}
 */
const removeISic = (s) => {
    return s.replace("ISic", "").replace("-", "")
}