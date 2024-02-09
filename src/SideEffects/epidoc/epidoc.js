
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
    setMidpointXMLIDs(base) {

        /**
         * Return the index of the next \@xml:id which is not null
         * If no ID, returns null
         * @param {Array.<TextElem>} textelems 
         * @param {number} startIdx
         * @returns {number} 
         */
        function indexOfNextID(textelems, startIdx) {

            for (let i=startIdx; i<textelems.length; i++) {
                const xmlid = textelems[i].xmlid
                if (xmlid != null) {
                    return i
                }
            }

            throw new MidpointIDError(
                `No @xml:id after TextElem index position ${startIdx}`
            )
        }


        const elems = this.textElems;
        const blocks = new NullIDBlocks([])
        let lastXMLID = null;

        for (let i=0; i<this.textElems.length; i++) {
            const elem = elems[i];
 
            if (elem.xmlid == null) {
                if (!blocks.containIndex(i)) {
                    const nextIDIndex = indexOfNextID(elems, i)
                    const nullidblock = new NullIDBlock(
                        i, 
                        nextIDIndex - 1, 
                        lastXMLID, 
                        elems[nextIDIndex].xmlid, 
                        base
                    )
                    blocks.push(nullidblock)
                }
                
            } else {
                lastXMLID = elem.xmlid
            }


        }

        blocks.assignIDs(elems)
    }

    // const [xmlid2, midpoints] = findNextIDAndMidpoints(elems, i)
    // const freeMidpoints = calcFreeMidpoints(xmlid1, xmlid2)
    // if (midpoints > freeMidpoints) {
    //     throw new MidpointIDError("Too many midpoints to assign")
    // } 

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