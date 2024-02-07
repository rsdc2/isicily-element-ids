export class ElementTypeError extends Error {
    /**
     * 
     * @param {string} requiredType
     * @param {string} actualType 
     */
        constructor(requiredType, actualType) {

            const msg = `Element type error: required ${requiredType}, 
            actual ${actualType}`
            super(msg)
        }
}

export class ElementNameError extends Error {
    /**
     * @param {string} requiredNS
     * @param {string} requiredLocalName
     * @param {string} actualNS
     * @param {string} actualLocalName
     */
        constructor(requiredNS, requiredLocalName, actualNS, actualLocalName) {

            const msg = `Element type error: required 
                    {${requiredNS}}${requiredLocalName}, 
                    actual {${actualNS}}${actualLocalName}`
            super(msg)
        }
}