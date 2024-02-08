
import HasXMLDoc from "../xml/hasxmldoc.js";
import HasXMLElem from "../xml/hasxmlelem.js"
import { ElementAttributeError } from "../xml/errors.js";
import XML from "../xml/xml.js"
import Edition from "./elements/edition.js";
import TextContainer from "./textContainer.js";
import Base from "../../Pure/base.js";
import Format from "../../Pure/format.js";
import Compress from "../../Pure/compress.js";


export default class EpiDoc extends HasXMLDoc {

    /**
     * Set the IDs in the TextElements to their compressed
     * form
     * @param {Base} base The Base of the IDs in the document
     */
    compressXMLIDs(base) {
        this.textElems.forEach ( (elem) => {
            elem.compressID(base)
        })
    }

    /**
     * Convert the IDs in the TextElements from their Base52 form 
     * to their Base100 form
     * @param {Base} oldBase The Base of the IDs in the document
     * @param {Base} newBase
     */
    convertXMLIDs(oldBase, newBase) {
        this.textElems.forEach ( (elem) => {
            elem.convertID(oldBase, newBase)
        })
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
     */
    expandXMLIDs(base) {

        this.textElems.forEach ( (elem) => {
            elem.expandID(base)
        })
    }

    /**
     * Fill in missing IDs with the midpoints
     * @param {Base} base 
     */
    setMidpointIDs(base) {
        
    }

    /**
     * Create a new EpiDoc object from an XMLDocument
     * @param {XMLDocument} doc 
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
     */
    setXMLIDs(base) {
        this.textElems.forEach( (elem, index) => {
            const tokenDecimalID = BigInt((index + 1) * 10).toString()
            const paddedTokenDecimalID = tokenDecimalID.padStart(5, "0")
            const fullID = this.id.concat("-", paddedTokenDecimalID)
            const compressed = Compress.compressID(base)(fullID)
            elem.setXMLID(compressed) 
        })
    }

    get textElems() {
        const elems = this.editions.flatMap(
            edition => edition.descendantTextElems
        )

        return elems
    }

}