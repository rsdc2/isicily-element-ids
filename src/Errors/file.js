import { ISicElementIDError } from "./isicElementIDError.js"

export class CSVFormatError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "CSVFormatError: " + this.message
    }
}

export class FileError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "FileError: " + this.message
    }
}