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