import { ISicElementIDError } from "../../Pure/errors.js"

export class ExistingIDError extends ISicElementIDError {
    /**
     * @param {string} existingID
     * @param {Element} element
     */
    constructor(existingID, element) {

        const msg = `ExistingIDError: ` +
                `an ID already exists on element <${element.localName}/>, ` +
                `which is ${existingID}`
        super(msg)
    }    
}

export class UnexpectedIDError extends ISicElementIDError {
  
}

export class MidpointIDError extends ISicElementIDError {
    /**
     * @param {string} msg
     */
    constructor(msg) {

        const msg_ = `MidpointIDError: ` + msg
        super(msg_)
    }    
}

export class NullIDError extends ISicElementIDError {
    /**
     * @param {string} msg
     */
    constructor(msg) {

        const msg_ = `NullIDError: ` + msg
        super(msg_)
    }    
}

export class TextElemLengthError extends ISicElementIDError {
    
}

export class TextElemsIndexError extends ISicElementIDError {
    
}

export class UniqueIDError extends ISicElementIDError {
    
}