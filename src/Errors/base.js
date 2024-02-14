import { ISicElementIDError } from "./isicElementIDError.js"

export class BaseIndexError extends ISicElementIDError {

    /**
     * 
     * @param {string | number} baseIndex 
     */
    constructor(baseIndex) {
        super()
        this.message = 
            `Index error: Base ${baseIndex} not valid: only Base 52 ` +  
            `and Base 100 are currently supported`
    }
}

export class BaseLengthError extends ISicElementIDError {
    /**
     * 
     * @param {string} baseValue
     */
    constructor(baseValue) {
        super()
        this.message = 
            `Length error: ${baseValue} is of length ${baseValue.length}: should be 5`
    }    
}

export class BaseValueError extends ISicElementIDError {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Value error: " + this.message
    }
}