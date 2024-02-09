
import HasXMLDoc from "../xml/hasxmldoc.js";
import Edition from "./elements/edition.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";
import TextElem from "./textElem.js";
import { MidpointIDError } from "./errors.js";
import NullIDBlock from "./nullidblock.js";
import NullIDBlocks from "./nullidblocks.js";


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
        return this.textElems
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
        return this.textElems
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
        return this.textElems
    }

    /**
     * Finds any text elements that lack an
     * \@xml:id and assigns an \@xml:id between those that 
     * have already been assigned
     * @param {Base} base 
     */
    setMidpointXMLIDs(base) {
        const blocks = NullIDBlocks.fromTextElems(this.textElems, base)
        return blocks.assignIDs()
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