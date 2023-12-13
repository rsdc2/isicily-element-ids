/**
 * Returns true if @param s is a valid I.Sicily element ID
 * @param {string} s
 * @returns {boolean} 
 */

function validateLongID(s) {
    const m = s.match(/^ISic[0-9]{6,6}-[0-9]{5,5}$/)
    return m != null
}

/**
 * Returns true if @param s is a valid short ISicily element ID
 * @param {string} s
 * @returns {boolean} 
 */

function validateShortID(s) {
    const m = s.match(/^[A-Za-zΑ-Ωα-ω]{5,5}$/)
    return m != null
}
