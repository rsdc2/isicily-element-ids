import Base from "../../Pure/base.js";
import Format from "../../Pure/format.js";
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

    /**
     * Assign \@xml:id to each descendant text element
     * @param {Base} base
     */
    setXMLIds(base) {
        this.descendantTextElems.forEach( (elem, index) => {
            const xmlid = base.decToBase(BigInt(index * 10))
            const padded = Format.padShortID(base.zero, xmlid)
            elem.setXMLId(padded) 
        })
    }

}