
export default class XML {
    /**
     * Returns as XPathResult as an Array of Node objects
     * @param {XPathResult} xpathresult 
     * @returns {Array.<Node>}
     */
    static iteratorToArray = xpathresult => {
        if (xpathresult.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
            const arr = /** @type {Array.<Node>} */ ([])
            let next = xpathresult.iterateNext()
            while (next) {
                arr.push(next)
                next = xpathresult.iterateNext()
            }
            return arr
        }
    }

    /**
     * Run an xpath expression on a Node, and return an Array of Node objects
     * @param {string} expr
     * @param {Node} elem
     * @returns {Array.<Node>}
     */
    static xpath = (expr, elem) => {
        try {
            // Evaluate the xpath expression
            const result = document.evaluate(
                expr, 
                elem, 
                null, 
                XPathResult.ORDERED_NODE_ITERATOR_TYPE, 
                null
            )
            return XML.iteratorToArray(result)
        } catch (error) {
            if (error instanceof TypeError) {
                throw error
            } else {
                throw error
            }
        }

    }
} 