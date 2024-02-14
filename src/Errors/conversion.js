import { ISicElementIDError } from "./isicElementIDError.js"

export class ConversionError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Conversion error: " + this.message
    }
    
}

