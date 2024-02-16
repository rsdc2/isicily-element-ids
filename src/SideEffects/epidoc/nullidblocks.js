import NullIDBlock from "./nullidblock.js";
import TextElem from "./textElem.js";
import TextElems from "./textElems.js";
import { MidpointIDError } from "../../Errors/ids.js";
import Base from "../../Pure/base.js";

/**
 * Represents contiguous sequences of text elements
 * that lack \@xml:id
 */
export default class NullIDBlocks {
    #blocks
    #textelems

    /**
     * 
     * @param {TextElems} textelems 
     * @param {NullIDBlock[]} blocks
     */
    constructor(textelems, blocks) {
        this.#blocks = blocks
        this.#textelems = textelems
    }

    /**
     * Assign \@xml:id to elements that do not have one
     */
    assignIDs() {
        const elems = this.#textelems

        this.blocks.forEach(
            (block) => block.assignIDs(elems)
        )

        return elems
    }

    get blocks() {
        return this.#blocks
    }

    /**
     * 
     * @param {NullIDBlock[]} blocks 
     * @param {number} index 
     */
    static containIndex(blocks, index) {
        for (let i=0; i<blocks.length; i++) {
            const block = blocks[i]
            if (block.containsIndex(index)) {
                return true
            }
        }

        return false   
    }

    /**
     * Return true if any of the NullIDBlocks contains the index
     * @param {number} index 
     * @returns {boolean}
     */
    containIndex(index) {
        const blocks = this.#blocks
        return NullIDBlocks.containIndex(blocks, index)
    }

    /**
     * 
     * @param {TextElem[]} textelemArray
     * @param {Base} base
     * @returns {NullIDBlocks} 
     */
    static fromTextElemArray(textelemArray, base) {
        const textelems = new TextElems(textelemArray)
        return NullIDBlocks.fromTextElems(textelems, base)
    }

    /**
     * Gathers all contiguous sequences of text elements
     * that lack IDs in a NullIDBlocks object
     * @param {TextElems} textelems 
     * @param {Base} base 
     * @returns {NullIDBlocks}
     */
    static fromTextElems(textelems, base) {

        /**
         * Return the index of the next \@xml:id in 
         * TextElems which is not null
         * @param {Array.<TextElem>} textelems 
         * @param {number} startIdx
         * @returns {number} 
         */
        function indexOfNextID(textelems, startIdx) {

            for (let i=startIdx; i<textelems.length; i++) {
                const xmlid = textelems[i].xmlID
                if (xmlid != null) {
                    return i
                }
            }

            throw new MidpointIDError(
                `No @xml:id after TextElem index position ${startIdx}`
            )
        }

        const blocks = /** @type {NullIDBlock[]} */ ([])
        let lastXMLID = null;

        // Loop through all the text elements to establish
        // where the sequences of null IDs are
        textelems.elems.forEach(
            (elem, i, elems) => {
                if (elem.xmlID == null) {
                    if (!NullIDBlocks.containIndex(blocks, i)) {
                        const nextIDIndex = indexOfNextID(elems, i);
                        const nullidblock = new NullIDBlock(
                            i, 
                            nextIDIndex - 1, 
                            lastXMLID, 
                            elems[nextIDIndex].xmlID, 
                            base
                        )
                        blocks.push(nullidblock);
                    }
                } else {
                    lastXMLID = elem.xmlID;
                }
            }
        )

        return new NullIDBlocks(textelems, blocks)
    }

    /**
     * Append a NullIDBlock
     * @param {NullIDBlock} block 
     */
    push(block) {
        this.#blocks.push(block)
    }
}