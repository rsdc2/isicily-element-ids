export class ElementAttributeError extends Error {
    /**
     * 
     * @param {string} attributeName
     * @param {string} requiredVal
     * @param {string} actualVal
     */
        constructor(attributeName, requiredVal, actualVal) {

            const msg = `ElementAttributeError: ${attributeName} 
                            required to be ${requiredVal}, 
                            actual ${actualVal}`
            super(msg)
        }
}


export class LocalNameError extends Error {
    /**
     * @param {string} requiredLocalName
     * @param {string} actualLocalName
     */
    constructor(requiredLocalName, actualLocalName) {

        const msg = `LocalNameError: required 
                ${requiredLocalName}, 
                ${actualLocalName}`
        super(msg)
    }    
}

export class NamespaceError extends Error {
    /**
     * @param {string} requiredNS
     * @param {string} actualNS
     */
        constructor(requiredNS, actualNS) {

            const msg = `NamespaceError: required 
                    ${requiredNS},
                    actual ${actualNS}`
            super(msg)
        }
}
