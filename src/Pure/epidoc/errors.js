export class ElementTypeError extends Error {
    /**
     * 
     * @param {string} requiredType
     * @param {string} actualType 
     */
        constructor(requiredType, actualType) {

            const msg = `Element type error: required ${requiredType}, actual ${actualType}`
            super(msg)
        }
}