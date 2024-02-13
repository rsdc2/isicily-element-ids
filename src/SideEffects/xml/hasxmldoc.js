import HasXMLElem from "./hasxmlelem.js"

/**
 * Services for EpiDoc XML documents
 */
export default class HasXMLDoc {
    #doc

    /**
     * 
     * @param {XMLDocument} doc 
     */
    constructor(doc) {
        this.#doc = doc
    }

    /**
     * 
     * @param {string} version 
     * @param {string | null} encoding 
     * @param {string | null} standalone 
     * @returns 
     */
    createXMLDeclaration(
        version = "1.0", 
        encoding = "UTF-8", 
        standalone = null
    ) {
        if (this.XMLDeclaration != null) {
            return
        }
        
        let dataStr = `version="${version}"`;

        if (encoding != null) {
            dataStr = dataStr.concat(` encoding="${encoding}"`)
        }

        if (standalone != null) {
            dataStr = dataStr.concat(` standalone="${standalone}"`)
        }

        const declaration = this.#doc.createProcessingInstruction(
            "xml", 
            dataStr
        )
        this.#doc.insertBefore(declaration, this.#doc.firstChild)
    }

    get doc() {
        return this.#doc
    }

    get processingInstructions() {
        const prevs = /** @type {Node[]} */ ([]);
        let prev = /** @type {Node} */ (this.root.elem)

        while (prev != null) {
            if (prev.nodeType === 7) { // PROCESSING_INSTRUCTION
                prevs.push(prev)
            }
            prev = prev.previousSibling
        }
        return /** @type{ProcessingInstruction[]} */ (prevs.reverse())
    }

    /**
     * @returns {HasXMLElem}
     */
    get root() {
        return new HasXMLElem(this.#doc.documentElement)
    } 

    /**
     * 
     * @param {XMLSerializer} serializer 
     * @param {boolean} declaration 
     */
    serializeToString(serializer, declaration = true) {
        if (declaration) {
            this.createXMLDeclaration()
        }
        return serializer.serializeToString(this.#doc)
    }

    /**
     * @returns {ProcessingInstruction | null}
     */
    get XMLDeclaration() {
        this.processingInstructions.forEach( item => {
                if (item.target === "xml" && item.data.includes("version")) {
                    return item
                }
            }
        )
        return null
    }

}