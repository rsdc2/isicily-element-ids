
import HasXMLElem from "../xml/hasxmlelem.js";
import Constants from "../../Pure/constants.js";

const {TEINS, XMLNS} = Constants

/**
 * API for EpiDoc edition elements
 */
export default class TextElem extends HasXMLElem {

    /**
     * 
     * @param {Element} elem 
     */
    static fromElem(elem) {
        return new TextElem(elem)
    }

    /**
     * Get the \@xml:id attribute value
     * @returns {string}
     */
    get xmlid() {
        return this.attributeValNS(XMLNS, "id")
    }

    /**
     * 
     * @param {string} id 
     */
    setXMLID(id) {
        this.elem.setAttributeNS(XMLNS, "id", id)
    }
}