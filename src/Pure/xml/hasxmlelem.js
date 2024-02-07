import { ElementAttributeError, LocalNameError, NamespaceError } from "./errors.js"
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
     * @param {string} attrName attribute qualified name
     * @param {string} attrVal attribute value
     * 
     */
    assertAttrVal(attrName, attrVal) {
        if (this.attribute(attrName).value !== attrVal) {
            throw new ElementAttributeError(
                attrName,
                attrVal, 
                this.attribute(attrName).value
            )
        }
    }

    /**
     * 
     * @param {string} localName
     * @param {string} namespace 
     */
    assertNameNS(localName, namespace) {
        if (this.localName !== localName) {
            throw new LocalNameError(localName, this.localName)
        }

        this.assertNS(namespace)
    }

    /**
     * 
     * @param {string} namespace 
     */
    assertNS(namespace) {
        if (this.namespace !== namespace) {
            throw new NamespaceError(
                namespace,
                this.namespace
            )
        }
    }

    /**
     * Check the \@type attribute
     * @param {string} typeValue 
     * 
     */
    assertType(typeValue) {
        if (this.attribute("type").value !== typeValue) {
            throw new ElementAttributeError(
                "type",
                typeValue, 
                this.attribute("type").value
            )
        }
    }


    /**
     * Return the element's Attr bearing the 
     * specified name
     * @param {string} qualifiedName
     */
    attribute(qualifiedName) {
        return this.attributes.getNamedItem(qualifiedName)
    }

    /**
     * Return the value of the element's Attr bearing
     * the specified qualified name
     * @param {string} qualifiedName
     */
    attributeVal(qualifiedName) {
        return this.attributes.getNamedItem(qualifiedName).value
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

    get localName() {
        return this.#elem.localName
    }

    get namespace() {
        return this.#elem.namespaceURI
    }
}