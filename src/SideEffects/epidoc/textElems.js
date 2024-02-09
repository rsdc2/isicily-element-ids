import Base from "../../Pure/base.js"
import TextElem from "./textElem.js"
import NullIDBlocks from "./nullidblocks.js"
import { MidpointIDError, TextElemsIndexError } from "./errors.js"

/**
 * Represents a collection of text elements
 */
export default class TextElems {
    #elems

    /**
     * 
     * @param {TextElem[]} textelems 
     */
    constructor(textelems) {
        this.#elems = textelems
    }

    /**
     * @returns {boolean}
     */
    assertFirstElemHasID() {
        if (this.first.xmlid == null) {
            throw new MidpointIDError("First element has no @xml:id")
        }
        return true
    }

    assertLastElemHasID() {
        if (this.last.xmlid == null) {
            throw new MidpointIDError("Last element has no @xml:id")
        }
        return true
    }


    /**
     * Set the IDs in the TextElements to their compressed
     * form
     * @param {Base} base The Base of the IDs in the document
     * @returns {TextElems}
     */
    compressXMLIDs(base) {
        this.elems.forEach ( (elem) => {
            elem.compressID(base)
        })
        return this
    }



    /**
     * Convert the IDs in the TextElements from their Base52 form 
     * to their Base100 form
     * @param {Base} oldBase The Base of the IDs in the document
     * @param {Base} newBase
     */
    convertXMLIDs(oldBase, newBase) {
        this.elems.forEach ( (elem) => {
            elem.convertID(oldBase, newBase)
        })
        return this
    }

    /**
     * Set the IDs in the TextElements to their expanded
     * (decompressed) form
     * @param {Base} base The Base of the IDs in the document
     * @returns {TextElems}
     */
    expandXMLIDs(base) {
        this.elems.forEach ( (elem) => {
            elem.expandID(base)
        })
        return this
    }

    /**
     * @returns {TextElem}
     */
    get first() {
        const first = this.#elems[0]

        if (first == null) {
            throw new TextElemsIndexError("No TextElems")
        }

        return first
    }

    get last() {
        const last = this.#elems.reverse()[0]
        if (last == null) {
            throw new TextElemsIndexError("No TextElems")
        }        
        return last
    }

    /**
     * Finds any text elements that lack an
     * \@xml:id and assigns an \@xml:id between those that 
     * have already been assigned
     * @param {Base} base 
     */
    setMidpointXMLIDs(base) {
        this.assertFirstElemHasID()
        this.assertLastElemHasID()
        const blocks = NullIDBlocks.fromTextElems(this, base)
        return blocks.assignIDs()
    }

    get elems() {
        return this.#elems
    }
}