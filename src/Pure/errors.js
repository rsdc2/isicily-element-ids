import Validate from "./validate.js"

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

    static getShortIDValidationIndividual = (text) => {
        let error = Err.ERR.ISVALID
        let status = ""
        if (Validate.validateShortID(text)) {
            status = "This ID is valid"
            error = Err.ERR.ISVALID
        } else {
            if (Validate.containsNumerals(text)) {
                status = Err.containsNumeralErr("")
                error = Err.ERR.CONTAINSNUMERAL
            }
            else if (Validate.containsSpecial(text)) {
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
     * @param {Array.<bigint>} errNo 
     */
    static isGenericErr = (...errNo) => {
        return errNo.every( x => x <= 2n )
    }
}

