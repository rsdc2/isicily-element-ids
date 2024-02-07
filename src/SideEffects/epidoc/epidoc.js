
import HasXMLDoc from "../xml/hasxmldoc.js";
import HasXMLElem from "../xml/hasxmlelem.js"
import { ElementAttributeError } from "../xml/errors.js";
import XML from "../xml/xml.js"
import Edition from "./elements/edition.js";
import TextContainer from "./textContainer.js";
import Base from "../../Pure/base.js";
import Format from "../../Pure/format.js";


export default class EpiDoc extends HasXMLDoc {

    get editions() {
        const editionElems = this.doc.querySelectorAll('div[type="edition"]')
        const editionElemArr = Array.from(editionElems)
        return editionElemArr.map(Edition.fromElem)
    }

    /**
     * 
     * @param {XMLDocument} doc 
     */
    static fromDoc(doc) {
        return new EpiDoc(doc)
    }

    /**
     * Assign \@xml:id to each descendant text element
     * @param {Base} base
     */
    setXMLIDs(base) {
        this.textElems.forEach( (elem, index) => {
            const xmlid = base.decToBase(BigInt(index * 10))
            const padded = Format.padShortID(base.zero, xmlid)
            elem.setXMLID(padded) 
        })
    }

    get textElems() {
        const elems = this.editions.flatMap(
            edition => edition.descendantTextElems
        )

        return elems
    }

}