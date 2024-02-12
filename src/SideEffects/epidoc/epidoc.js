
import HasXMLDoc from "../xml/hasxmldoc.js";
import Edition from "./elements/edition.js";
import TextElems from "./textElems.js";
import Constants from "../../Pure/constants.js";

const {TEINS} = Constants


export default class EpiDoc extends HasXMLDoc {

    /**
     * 
     * @param {XMLDocument} doc 
     */
    constructor(doc) {
        super(doc)
        this.assertTEINameAndNS()
    }

    /**
     * Assert that the root element has localName TEI 
     * and uses TEI namespace
     */
    assertTEINameAndNS() {
        this.root.assertNameNS("TEI", TEINS)
    }


    get editions() {
        const editionElems = this.doc.querySelectorAll('div[type="edition"]')
        const editionElemArr = Array.from(editionElems)
        return editionElemArr.map(Edition.fromElem)
    }

    /**
     * Create a new EpiDoc object from an XMLDocument
     * @param {XMLDocument} doc 
     * @returns {EpiDoc}
     */
    static fromDoc(doc) {
        return new EpiDoc(doc)
    }

    /**
     * The ISicily document ID
     * @returns {string}
     */
    get id() {
        return this.doc
            .querySelector('publicationStmt > idno[type="filename"]')
            .textContent
    }   

    /**
     * @returns {TextElems}
     */
    get textElems() {
        const elems = this.editions.flatMap(
            edition => edition.descendantTextElems
        )

        return new TextElems(elems)
    }

}