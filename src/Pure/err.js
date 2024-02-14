import Validator from "./validator.js"

export default class Err {
    /**
     * 
     * @param {string} s 
     * @returns {string}
     */

    static containsNumeralErr = (s) => `ID ${s} contains at least one numeral. It should contain only Greek or Latin letters.`


    /**
     * 
     * @param {string} s 
     * @returns {string}
     */

    static containsSpecialErr = (s) => `ID ${s} contains at least one special characater. It should contain only Greek or Latin letters.`


    /**
     * 
     * @param {string} s 
     * @returns {string}
     */
    static idNotValidErr = (s) => `ID ${s} is not valid`

    static ERR = {
        ISVALID: 0,
        ISINVALID: 1,
        ISEMPTY: 2,
        CONTAINSNUMERAL: 3,
        CONTAINSSPECIAL: 4
    }

    /**
     * Returns the validation status of a 
     * short (i.e. compressed) ID. 
     * If valid, returns ERR.ISVALID,
     * otherwise returns a tuple with 
     * an error code and a string giving the
     * description of the error.
     * @param {string} text 
     * @returns {[number, string]} 
     */

    static getShortIDValidationIndividual = (text) => {
        let error = Err.ERR.ISVALID
        let status = ""
        if (Validator.shortID(text)) {
            status = "This ID is valid"
            error = Err.ERR.ISVALID
        } else {
            if (Validator.containsNumerals(text)) {
                status = Err.containsNumeralErr("")
                error = Err.ERR.CONTAINSNUMERAL
            }
            else if (Validator.containsSpecial(text)) {
                status = Err.containsSpecialErr("")
                error = Err.ERR.CONTAINSSPECIAL
            }
            else if (text === "") {
                error = Err.ERR.ISEMPTY
            }

            else {
                status = Err.idNotValidErr("")
                error = Err.ERR.ISINVALID
            }
        }

        return [error, status]

    }
    /**
     * 
     * @param {Array.<number>} errNo 
     */
    static isGenericErr = (...errNo) => {
        return errNo.every( x => x <= 2n )
    }
}

