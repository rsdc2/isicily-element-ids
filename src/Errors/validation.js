import { ISicElementIDError } from "./isicElementIDError.js"

export class ValidationError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Validation error: " + this.message
    }    
}

