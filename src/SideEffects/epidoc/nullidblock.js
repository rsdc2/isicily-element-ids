import Base from "../../Pure/base.js"
import TextElem from "./textElem.js"
import TextElems from "./textElems.js"
import { MidpointIDError, TextElemLengthError } from "./errors.js"
import Format from "../../Pure/format.js"
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
     * 
     * @param {number} startIdx Position of the first element in the TextElem Array
     * @param {number} endIdx Position of the final element in the TextElem Array
     * @param {string | null} xmlid1 Already defined ID before the beginning of the block
     * @param {string} xmlid2 Already defined ID after the end of the block
     * @param {Base} base
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
    }

    /**
     * 
     * @param {TextElems} textelems 
     * @returns {TextElems}
     */
    assignIDs(textelems) {
        this.#assertCompatibleArrayLength(textelems.elems)

        const newids = this.newIDs
        for (let i=0; i<newids.length; i++) {
            const elem = textelems.elems[i + this.#startIdx]
            const newid = newids[i]
            
            elem.setXMLID(newid, false, true)
        }       
        return textelems 
    }

    /**
     * 
     * @param {Array.<TextElem>} textelems
     * @returns {boolean} 
     */
    #assertCompatibleArrayLength(textelems) {
        if (textelems.length < this.length) {
            throw new TextElemLengthError(
                "TextElem Array does not have enough members"
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

    get freeMidpointCount() {
        const {xmlid1, xmlid2} = this
        const freeMidpointCount = xmlid2.subtract(xmlid1).dec - 1n;
        return Number(freeMidpointCount);
    }

    get intervalSize() {
        const diff = this.xmlid2.dec - this.xmlid1.dec
        const firstInterval = Number(diff) / (this.midpointsNeededCount + 1)
        return Math.trunc(firstInterval)
    }

    get length() {
        return this.#endIdx - this.#startIdx + 1
    }

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