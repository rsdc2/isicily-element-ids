import Base from "../../Pure/base.js"
import TextElem from "./textElem.js"
import { TextElemLengthError } from "./errors.js"
import Format from "../../Pure/format.js"

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
     * @param {string} xmlid1 Already defined ID before the beginning of the block
     * @param {string} xmlid2 Already defined ID after the end of the block
     * @param {Base} base
     */
    constructor(startIdx, endIdx, xmlid1, xmlid2, base) {
        this.#startIdx = startIdx
        this.#endIdx = endIdx
        this.#xmlid1 = xmlid1
        this.#xmlid2 = xmlid2
        this.#base = base
    }

    /**
     * 
     * @param {Array.<TextElem>} textelems 
     * @returns {Array.<TextElem>}
     */
    assignNewIDs(textelems) {
        this.#assertCompatibleArrayLength(textelems)

        const newids = this.newIDs
        for (let i=this.#startIdx; i<=this.#endIdx; i++) {
            const elem = textelems[i]
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

    get endIdx() {
        return this.#endIdx
    }

    get freeMidpointCount() {
        const {base, xmlid1, xmlid2} = this
        const freeMidpointCount = base.toDec(xmlid2) - base.toDec(xmlid1) - 1n;
        return Number(freeMidpointCount);
    }

    get intervalSize() {
        const rawIntervalSize = this.freeMidpointCount / (this.midpointsNeededCount + 1)
        return Math.trunc(rawIntervalSize) + 1
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
            const newID = base.addDec(intervalSize * i, xmlid1)
            const padded = newID.padStart(5, base.zero)
            newIDs.push(padded)
        }

        return newIDs
    }

    get startIdx() {
        return this.#startIdx
    }

    get xmlid1() {
        return this.#xmlid1
    }

    get xmlid2() {
        return this.#xmlid2
    }

}