
import HasXMLElem from "../xml/hasxmlelem.js";
import TextElem from "./textElem.js"

/**
 * API for EpiDoc edition elements
 */
export default class TextContainer extends HasXMLElem {

    get descendantTextElems() {
        return this.descendants.map(TextElem.fromElem)
    }

    /**
     * 
     * @param {Element} elem 
     */
    static fromElem(elem) {
        return new TextContainer(elem)
    }



}