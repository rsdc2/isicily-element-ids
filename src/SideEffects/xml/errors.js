export class ElementAttributeError extends Error {
    /**
     * 
     * @param {string} attributeName
     * @param {string} requiredVal
     * @param {string} actualVal
     */
        constructor(attributeName, requiredVal, actualVal) {

            const msg = `ElementAttributeError: ${attributeName} ` +
                            `required to be ${requiredVal}, whereas the` +
                            `actual attribute value is ${actualVal}`
            super(msg)
        }
}


export class LocalNameError extends Error {
    /**
     * @param {string} requiredLocalName
     * @param {string} actualLocalName
     */
    constructor(requiredLocalName, actualLocalName) {

        const msg = `LocalNameError: required localName is ` +
                `"${requiredLocalName}", whereas the actual name is ` + 
                `"${actualLocalName}"`
        super(msg)
    }    
}

export class NamespaceError extends Error {
    /**
     * @param {string} requiredNS
     * @param {string} actualNS
     */
        constructor(requiredNS, actualNS) {

            const msg = `NamespaceError: the required namespace is ` +
                    `${requiredNS}, whereas the actual namespace is ` +
                    `actual ${actualNS}`
            super(msg)
        }
}
