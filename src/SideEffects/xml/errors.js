import { ISicElementIDError } from "../../Pure/errors.js"

export class ElementAttributeError extends ISicElementIDError {
    /**
     * 
     * @param {string} attributeName
     * @param {string} requiredVal
     * @param {string} actualVal
     */
    constructor(attributeName, requiredVal, actualVal) {

        const msg = `ElementAttributeError: ${attributeName} ` +
                        `required to be ${requiredVal}, whereas the ` +
                        `actual attribute value is ${actualVal}`
        super(msg)
    }
}


export class LocalNameError extends ISicElementIDError {
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

export class NamespaceError extends ISicElementIDError {
    /**
     * @param {string} requiredNS
     * @param {string} actualNS
     */
        constructor(requiredNS, actualNS) {
            let actualNS_;
            if (actualNS == null) {
                actualNS_ = "empty"
            } else {
                actualNS_ = `"${actualNS}"`
            }

            const msg = `NamespaceError: the required namespace is ` +
                    `"${requiredNS}", whereas the actual namespace is ` +
                    `${actualNS_}`
            super(msg)
        }
}
