
import HasXMLDoc from "../xml/hasxmldoc.js";
import Edition from "./elements/edition.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";
import TextElem from "./textElem.js";
import { MidpointIDError } from "./errors.js";


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
         * Calculate the number of free ID positions
         * between two IDs
         * @param {string} xmlid1 
         * @param {string} xmlid2 
         * @returns {number}
         */
        function calcFreeMidpoints(xmlid1, xmlid2) {
            const freeMidpoints = base.toDec(xmlid2) - 
                base.toDec(xmlid1);

            return Number(freeMidpoints)
        }

        /**
         * Find the next given ID in the sequence, 
         * and return that with the number of 
         * midpoints to find in between as a 
         * tuple 
         * @param {Array.<TextElem>} textelems 
         * @param {number} startIdx
         * @returns {[string | null, number]} 
         */
        function findNextIDAndDistToID(textelems, startIdx) {
            let j = 0;

            for (let i=startIdx; i<textelems.length; i++) {
                const xmlid = textelems[i].xmlid
                if (xmlid == null) {
                    j++;
                    if (j > 9) {
                        throw new MidpointIDError(
                            "Too many midpoint IDs to assign"
                        )
                    }
                } else {
                    return [xmlid, j]
                }
            }

            return [null, j]
        }

        /**
         * Calculate the integer distance between values
         * based on the number of midpoints in relation 
         * to the number of available midpoints
         * @param {number} freeMidpoints 
         * @param {number} midpointsNeeded 
         * @returns {number}
         */
        function calcIntervalSize(freeMidpoints, midpointsNeeded) {
            const rawIntervalSize = freeMidpoints / midpointsNeeded
            return Math.trunc(rawIntervalSize)
        }

        const elems = this.textElems;
        
        // Initialize the array of intervals 

        const intervals = /** @type {Array.<[number, number]>} */ ([]);
        let lastID = elems[0].xmlid;
        let lastIDIndex = 0;

        for (let i=0; i<this.textElems.length; i++) {
            const elem = elems[i];

            if (elem.xmlid == null) {
                const [xmlid2, distToNextID] = findNextIDAndDistToID(elems, i)
                const xmlid1 = lastID
                const distToLastID = i - lastIDIndex
                
                const freeMidpoints = calcFreeMidpoints(xmlid1, xmlid2)
                const intervalSize = calcIntervalSize(freeMidpoints, distToNextID)
                intervals.push([i, intervalSize])
            }

            if (elem.xmlid != null) {
                lastID = elem.xmlid
                lastIDIndex = i
            }
        }

        for (let j=0; j<intervals.length; j++) {
            const [index, interval] = intervals[j]

            const elem = elems[index]

        }

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