
export default class Format {

    /**
     * Inserts string elements into a number corresponding to an
     * ISicily ID + 4 or 5 digit element id
     * @param {string} s 
     * @param {number} baseIdx
     * @returns {string}
     */

    static insertISic(s, baseIdx) {
        if (baseIdx === 100) {
            const padded = s.padStart(11, '0')
            return "ISic" + padded.slice(0, 6) + "-" + padded.slice(6, 11)    
        } 
        else if (baseIdx === 52) {
            const padded = s.padStart(10, '0')
            return "ISic" + padded.slice(0, 6) + "-" + padded.slice(6, 10)    
        }
        else {
            console.error("Invalid base")
        }
        
    }

    /**
     * Pads out a short ID with zero value for that base
     * @param {string} zero
     * @param {string} s 
     * @returns {string}
     */

    static padShortID = (zero, s) => s.padStart(5, zero)

    /**
     * Removes string elements from a number corresponding to an
     * ISicily ID + 4 or 5 digit element id
     * @param {string} s 
     * @returns {string}
     */
    static removeISic = (s) => {
        return s.replace("ISic", "").replace("-", "")
    }

    /**
     * Removes underlining from Greek characters
     * @param {string} s 
     * @returns 
     */
    static removeUnderline (s) {
        return s.replace(/\<\/?u\>/g, "")
    }

    /**
     * Underline Greek characters
     * @param {string} s 
     * @returns {string} an HTML string with Greek characters surrounded by <u> tags
     */
    static underlineGreek = (s) => {
        return s.replace(/([α-ωΑ-Ω]+)/g, "<u>$1</u>")
    }
}