
import HasXMLElem from "../../Pure/xml/hasxmlelem.js";
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

    /**
     * Assign \@xml:id to each descendant text element
     */
    setXMLIds() {
        this.descendantTextElems.forEach( (elem, index) => {
            elem.setXMLId(index.toString()) 
        })
    }

}