
import HasXMLDoc from "../../Pure/xml/hasxmldoc.js";
import HasXMLElem from "../../Pure/xml/hasxmlelem.js"
import { ElementAttributeError } from "../../Pure/xml/errors.js";
import XML from "../../Pure/xml/xml.js"
import Edition from "./elements/edition.js";
import TextContainer from "./textContainer.js";


export default class EpiDoc extends HasXMLDoc {

    get editions() {
        const editionElems = this.doc.querySelectorAll('div[type="edition"')
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

}