
import HasXMLElem from "../xml/hasxmlelem.js";

/**
 * API for EpiDoc edition elements
 */
export default class EditionElem extends HasXMLElem {

    /**
     * 
     * @param {Element} elem 
     */
    static fromElem(elem) {
        return new EditionElem(elem)
    }

    /**
     * Get the \@xml:id attribute value
     * @returns {string}
     */
    get xmlid() {
        return this.attributeVal("xml:id")
    }
}