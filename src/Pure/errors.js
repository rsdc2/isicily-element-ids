/**
 * 
 * @param {string} s 
 * @returns 
 */

const containsNumeralErr = (s) => `ID ${s} contains at least one numeral. It should contain only Greek or Latin letters.`

const idNotValidErr = (s) => `ID ${s} is not valid`

const Err = {
    ISVALID: 0n,
    ISINVALID: 1n,
    CONTAINSNUMERAL: 2n,
    ISEMPTY: 3n
}

/**
 * 
 * @param {string} text 
 * @returns {[bigint, string]} 
 */

const getShortIDValidationIndividual = (text) => {
    let error = Err.ISVALID
    let status = ""
    if (validateShortID(text)) {
        status = "This ID is valid"
        error = Err.ISVALID
    } else {
        if (containsNumerals(text)) {
            status = containsNumeralErr("")
            error = Err.CONTAINSNUMERAL
        }
        else if (text === "") {
            error = Err.ISEMPTY
        }

        else {
            status = idNotValidErr("")
            error = Err.ISINVALID
        }
    }

    return [error, status]

}