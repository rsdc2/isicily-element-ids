import HasXMLElem from "./hasxmlelem.js"
import { XMLDeclarationError } from "./errors.js"
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
     * Creates an XML declaration for the document.
     * If one already exists, throws an error if
     * throwOnFail is set to true.
     * @param {Object} options
     * @param {string} [options.version = "1.0"] 
     * @param {string | null} [options.encoding = "UTF-8"] 
     * @param {string | null} [options.standalone = null] 
     * @param {boolean} [options.throwOnFail = false]
     * @returns {HasXMLDoc}
     */
    createXMLDeclaration({
            version = "1.0", 
            encoding = "UTF-8", 
            standalone = null,
            throwOnFail = false
        }
    ) {

        // cf. https://www.w3resource.com/xml/declarations.php

        if (this.XMLDeclaration == null) {

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
    
            return this
    
        } else {
            if (throwOnFail) {

                throw new XMLDeclarationError(
                    "XML declaration already exists. " +
                    "Did not create XML declaration."
                )
            }
        }
        
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
     * @param {boolean} addDeclaration Option to add an XML declaration.
     * This is unnecessary in the browser as XMLSerializer adds one itself.
     * In JSDom under Node, however, XMLSerializer does not automatically add a declaration.
     * @returns {string}
     */
    serializeToString(serializer, addDeclaration = true) {
        if (addDeclaration) {
            this.createXMLDeclaration({throwOnFail: false})
        }
        return serializer.serializeToString(this.#doc)
    }

    /**
     * Get the XML declaration of the current document, 
     * if it exists, null if not
     * @returns {ProcessingInstruction | null}
     */
    get XMLDeclaration() {

        const decl = this.processingInstructions.reduce( 
            (acc, item) => {
                const fieldMap = /** @type {Map<string, string>} */ (new Map())
                item.data.split(" ").forEach(item => {
                    const [key, value] = item.split("=")
                    fieldMap.set(key, value)
                })
                
                if (item.target === "xml" && fieldMap.has("version")) {
                    return item
                }
                return acc
            }, null
        )
        return decl
    }

}