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
 * Returns true if @param s is a valid I.Sicily element ID
 * @param {string} s
 * @returns {boolean} 
 */

function validateLongIDStrict(s) {
    const m = s.match(/^ISic[0-9]{6,6}-[0-9]{5,5}$/)
    return m != null
}

/**
 * 
 * @param {string} x 
 * @returns {boolean}
 */

const validateLongIdNonStrict = (x) => isDecimal(removeISic(x))

/**
 * Returns true if @param s is a valid short ISicily element ID
 * @param {string} s
 * @returns {boolean} 
 */

function validateShortIDStrict(s) {
    const m = s.match(/^[A-Za-zΑ-Ωα-ω]{5,5}$/)
    return m != null
}

/**
 * Returns true if @param s is a valid short ISicily element ID
 * @param {string} s
 * @returns {boolean} 
 */
function validateShortIdNonStrict(s) {
    const m = s.match(/^[A-Za-zΑ-Ωα-ω]+$/)
    return m != null
}

const validateLongID = STRICT ? validateLongIDStrict : validateLongIdNonStrict
const validateShortID = STRICT ? validateShortIDStrict : validateShortIdNonStrict

/**
 * @param {HTMLInputElement} input
 */
const validate = input => validateLongID(input.value) || validateShortID(input.value) 

