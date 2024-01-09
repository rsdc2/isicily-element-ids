
export const XML = {
    /**
     * 
     * @param {XPathResult} xpathresult 
     * @returns {Array.<Node>}
     */
    iteratorToArray : xpathresult => {
        if (xpathresult.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
            const arr = /** @type {Array.<Node>} */ ([])
            let next = xpathresult.iterateNext()
            while (next) {
                arr.push(next)
                next = xpathresult.iterateNext()
            }
            return arr
        }
    },

    /**
     * @param {string} expr
     * @param {Node} elem
     * @returns {Array.<Node>}
     */
    xpath : (expr, elem) => {
        const result = document.evaluate(expr, elem, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
        return XML.iteratorToArray(result)
    }
} 