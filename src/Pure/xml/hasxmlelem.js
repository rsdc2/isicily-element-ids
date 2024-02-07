import { ElementTypeError } from "../epidoc/errors.js"
import NamedNodeMap_ from "../namednodemap_.js"

export default class HasXMLElem {
    #elem 
    
    /**
     * 
     * @param {Element} elem 
     */
    constructor(elem) {
        this.#elem = elem
    }

    /**
     * Check the \@type attribute
     * @param {string} typeValue 
     * 
     */
    assertType(typeValue) {
        if (this.attribute("type").value !== typeValue) {
            throw new ElementTypeError(
                typeValue, 
                this.attribute("type").value
            )
        }
    }

    /**
     * @param {string} qualifiedName
     */
    attribute(qualifiedName) {
        return this.attributes.getNamedItem(qualifiedName)
    }

    get attributes() {
        return this.#elem.attributes
    }

    get attributesMap() {
        return NamedNodeMap_.toMap(this.#elem.attributes)
    }

    get elem() {
        return this.#elem
    }


}