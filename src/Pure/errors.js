import * as Validate from "./validate"

/**
 * 
 * @param {string} s 
 * @returns {string}
 */

export const containsNumeralErr = (s) => `ID ${s} contains at least one numeral. It should contain only Greek or Latin letters.`


/**
 * 
 * @param {string} s 
 * @returns {string}
 */

export const containsSpecialErr = (s) => `ID ${s} contains at least one special characater. It should contain only Greek or Latin letters.`


/**
 * 
 * @param {string} s 
 * @returns {string}
 */
export const idNotValidErr = (s) => `ID ${s} is not valid`

export const ERR = {
    ISVALID: 0n,
    ISINVALID: 1n,
    ISEMPTY: 2n,
    CONTAINSNUMERAL: 3n,
    CONTAINSSPECIAL: 4n
}

/**
 * 
 * @param {string} text 
 * @returns {[bigint, string]} 
 */

export const getShortIDValidationIndividual = (text) => {
    let error = ERR.ISVALID
    let status = ""
    if (Validate.validateShortID(text)) {
        status = "This ID is valid"
        error = ERR.ISVALID
    } else {
        if (Validate.containsNumerals(text)) {
            status = containsNumeralErr("")
            error = ERR.CONTAINSNUMERAL
        }
        else if (Validate.containsSpecial(text)) {
            status = containsSpecialErr("")
            error = ERR.CONTAINSSPECIAL
        }
        else if (text === "") {
            error = ERR.ISEMPTY
        }

        else {
            status = idNotValidErr("")
            error = ERR.ISINVALID
        }
    }

    return [error, status]

}
/**
 * 
 * @param {Array.<bigint>} errNo 
 */
export const isGenericErr = (...errNo) => {
    return errNo.every( x => x <= 2n )
}