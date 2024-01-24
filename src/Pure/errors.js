
export class ConversionError extends Error {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Conversion error: " + this.message
    }
    
}

export class BaseIndexError extends Error {

    /**
     * 
     * @param {string | number | bigint} baseIndex 
     */
    constructor(baseIndex) {
        super()
        this.message = 
            `Index error: Base ${baseIndex} not valid: only Base 52 ` +  
            `and Base 100 are currently supported`
    }
}

export class BaseLengthError extends Error {
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

export class BaseValueError extends Error {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Value error: " + this.message
    }
}

export class CSVFormatError extends Error {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "Format error: " + this.message
    }
}

export class FileError extends Error {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.message = "File error: " + this.message
    }
}