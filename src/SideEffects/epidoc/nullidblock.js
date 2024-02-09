import Base from "../../Pure/base.js"
import TextElem from "./textElem.js"
import TextElems from "./textElems.js"
import { MidpointIDError, TextElemLengthError } from "./errors.js"
import BaseValue from "../../Pure/baseValue.js"

/**
 * Class representing a sequence of consecutive
 * text elements that lack @xml:id
 */
export default class NullIDBlock {
    #startIdx
    #endIdx
    #xmlid1
    #xmlid2
    #base

    /**
     * Create a new NullIDBlock, i.e. sequence of elements that lack \@xml:id. Throws MidpointIDError if there are not 
     * enough free ID positions between xmlid1 and xmlid2
     * @param {number} startIdx Index of the first element without \@xml:id in the array of text elements (TextElems) 
     * @param {number} endIdx Index of the final element without \@xml:id in the array in the array of text elements (TextElems)
     * @param {string | null} xmlid1 The already defined \@xml:id immediately before the beginning of the block
     * @param {string} xmlid2 The already defined \@xml:id immediately after the end of the block
     * @param {Base} base The base of the \@xml:id to be used
     */
    constructor(startIdx, endIdx, xmlid1, xmlid2, base) {
        if (xmlid1 == null) {
            throw new MidpointIDError("First ID in block is null")
        }

        this.#startIdx = startIdx
        this.#endIdx = endIdx
        this.#xmlid1 = xmlid1
        this.#xmlid2 = xmlid2
        this.#base = base

        this.#assertEnoughFreeXMLIDs()
    }

    /**
     * Assigns IDs to those elements in textElems which match 
     * the indices of the NullIDBlock. 
     * Throws ExistingIDError if tries to overwrite an 
     * existing \@xml:id.
     * @param {TextElems} textelems 
     * @returns {TextElems}
     */
    assignIDs(textelems) {
        this.#assertCompatibleArrayLength(textelems)

        const newids = this.newIDs
        for (let i=0; i<newids.length; i++) {
            const elem = textelems.elems[i + this.#startIdx]
            const newid = newids[i]

            elem.setXMLID(newid, false, true)
        }       
        return textelems 
    }

    /**
     * Checks that the number of TextElems is at
     * least as many as the number of index positions
     * between startIdx and endIdx
     * @param {TextElems} textelems
     * @returns {boolean} 
     */
    #assertCompatibleArrayLength(textelems) {
        
        if (textelems.length < this.length) {
            throw new TextElemLengthError(
                `TextElem Array does not have enough members: ` +
                `required = ${this.length + 2}; ` +
                `actual = ${textelems.length}`
            )
        }

        if (this.endIdx >= textelems.lastIndex) {
            throw new TextElemLengthError(
                `The last index of the NullIDBlock (${this.endIdx}) ` +
                `is greater than the last index of the text element ` +
                `array (${textelems.lastIndex})`
            )
        }
        return true
    } 

    /**
     * Checks that there are suficient free IDs
     * between xmlid1 and xmlid2 for all the 
     * elements without ids that need them
     * @returns {boolean}
     */
    #assertEnoughFreeXMLIDs() {
        const enough = this.midpointsNeededCount <= this.freeMidpointCount
        if (!enough) {
            throw new MidpointIDError(
                `Not enough free IDs between @xml:id ` + 
                `"${this.xmlid1.baseStr}" and ` +
                `"${this.xmlid2.baseStr}"`
            )
        }
        return true
    }

    get base() {
        return this.#base
    }

    /**
     * Return true if the index occurs within the range
     * covered by the null ID block
     * @param {number} index 
     * @returns {boolean}
     */
    containsIndex(index) {
        return index >= this.#startIdx && index <= this.#endIdx
    }

    get endIdx() {
        return this.#endIdx
    }
    
    /**
     * The number of free \@xml:id's between the bounding
     * \@xml:id's
     */
    get freeMidpointCount() {
        const {xmlid1, xmlid2} = this
        const freeMidpointCount = xmlid2.subtract(xmlid1).dec - 1n;
        return Number(freeMidpointCount);
    }

    /**
     * The size of the interval between midpoints
     */
    get intervalSize() {
        const diff = this.xmlid2.dec - this.xmlid1.dec
        const firstInterval = Number(diff) / (this.midpointsNeededCount + 1)
        return Math.trunc(firstInterval)
    }

    /**
     * The absolute length of the NullIDBlock
     */
    get length() {
        return this.#endIdx - this.#startIdx + 1
    }

    /**
     * The length of the NullIDBlock, i.e. 
     * the number of elements needing an \@xml:id
     */
    get midpointsNeededCount() {
        return this.length
    }

    get newIDs() {
        const newIDs = /** @type {Array.<string>}*/ ([])
        const {base, xmlid1, xmlid2, intervalSize} = this
        
        for (let i=1; i<=this.length; i++) {
            const newID = base.addDec(intervalSize * i, xmlid1.baseStr)
            const padded = newID.padStart(5, base.zero)
            newIDs.push(padded)
        }

        return newIDs
    }

    get startIdx() {
        return this.#startIdx
    }

    get xmlid1() {
        return new BaseValue(this.#xmlid1, this.#base)
    }

    get xmlid2() {
        return new BaseValue(this.#xmlid2, this.#base)
    }

}