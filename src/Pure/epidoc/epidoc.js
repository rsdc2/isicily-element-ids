
import HasXMLDoc from "../xml/hasxmldoc.js";
import HasXMLElem from "../xml/hasxmlelem.js"
import { ElementTypeError } from "../xml/errors.js";
import XML from "../xml/xml.js"
import Edition from "./edition.js";


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