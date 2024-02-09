import NullIDBlock from "./nullidblock.js";
import TextElem from "./textElem.js";

export default class NullIDBlocks {
    #blocks

    /**
     * 
     * @param {NullIDBlock[]} blocks 
     */
    constructor(blocks) {
        this.#blocks = blocks
    }

    /**
     * 
     * @param {TextElem[]} textelems 
     */
    assignIDs(textelems) {
        for (let i=0; i<this.#blocks.length; i++) {
            textelems = this.#blocks[i].assignIDs(textelems)
        }
        return textelems
    }

    get blocks() {
        return this.#blocks
    }

    /**
     * 
     * @param {number} index 
     * @returns {boolean}
     */
    containIndex(index) {
        const blocks = this.#blocks
        for (let i=0; i<blocks.length; i++) {
            const block = blocks[i]
            if (block.containsIndex(index)) {
                return true
            }
        }

        return false
    }

    /**
     * 
     * @param {NullIDBlock} block 
     */
    push(block) {
        this.#blocks.push(block)
    }
}