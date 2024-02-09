

export class ExistingIDError extends Error {
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

export class MidpointIDError extends Error {
    /**
     * @param {string} msg
     */
    constructor(msg) {

        const msg_ = `MidpointIDError: ` + msg
        super(msg_)
    }    
}

export class TextElemLengthError extends Error {
    
}

export class TextElemsIndexError extends Error {
    
}