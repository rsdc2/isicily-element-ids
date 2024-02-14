import { ISicElementIDError } from "./isicElementIDError.js"

export class CSVFormatError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Format error: " + this.message
    }
}

export class FileError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "File error: " + this.message
    }
}