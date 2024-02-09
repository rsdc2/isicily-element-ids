
import HasXMLDoc from "../xml/hasxmldoc.js";
import Edition from "./elements/edition.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";
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

    /**
     * Set the IDs in the TextElements to their compressed
     * form
     * @param {Base} base The Base of the IDs in the document
     * @returns {TextElems}
     */
    compressXMLIDs(base) {
        return this.textElems.compressXMLIDs(base)
    }

    /**
     * Convert the IDs in the TextElements from their Base52 form 
     * to their Base100 form
     * @param {Base} oldBase The Base of the IDs in the document
     * @param {Base} newBase
     * @returns {TextElems}
     */
    convertXMLIDs(oldBase, newBase) {
        return this.textElems.convertXMLIDs(oldBase, newBase)
    }

    get editions() {
        const editionElems = this.doc.querySelectorAll('div[type="edition"]')
        const editionElemArr = Array.from(editionElems)
        return editionElemArr.map(Edition.fromElem)
    }

    /**
     * Set the IDs in the TextElements to their expanded
     * (decompressed) form
     * @param {Base} base The Base of the IDs in the document
     * @returns {TextElems}
     */
    expandXMLIDs(base) {
        return this.textElems.expandXMLIDs(base)
    }

    /**
     * Finds any text elements that lack an
     * \@xml:id and assigns an \@xml:id between those that 
     * have already been assigned
     * @param {Base} base 
     * @returns {TextElems}
     */
    setMidpointXMLIDs(base) {
        return this.textElems.setMidpointXMLIDs(base)
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
     * Assign \@xml:id to each descendant text element in place
     * @param {Base} base
     * @returns {TextElems}
     */
    setXMLIDs(base) {
        this.textElems.elems.forEach( (elem, index) => {
            const tokenDecimalID = BigInt((index + 1) * 10).toString()
            const paddedTokenDecimalID = tokenDecimalID.padStart(5, "0")
            const fullID = this.id.concat("-", paddedTokenDecimalID)
            const compressed = Compress.compressID(base)(fullID)
            elem.setXMLID(compressed) 
        })
        return this.textElems
    }

    get textElems() {
        const elems = this.editions.flatMap(
            edition => edition.descendantTextElems
        )

        return new TextElems(elems)
    }

}