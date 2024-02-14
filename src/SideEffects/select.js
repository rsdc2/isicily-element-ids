import { Arr } from "../Pure/arr.js"
import XML from "./xml/xml.js"
import { NoSelectionError } from "./errors.js"

export default class Select {

    /**
     * Returns the caret position in a div
     * @param {string} id
     * @returns {number}
     */

    static getCaretPosition = (id) => {
        const anchorNode = document.getSelection().anchorNode
        if (anchorNode === null) {
            throw new NoSelectionError()
        }

        const priorTextNodes = XML.xpath(
            `preceding::text()[ancestor::div[@id="${id}"]]`, 
            anchorNode
        )
        return priorTextNodes.map(node => node.textContent)
            .join("")
            .length + document.getSelection().anchorOffset
    }

    /**
     * Returns the required position of the caret
     * in terms of child text node and offset within that node
     * given a parent element and a caret position within that
     * parent
     * @param {HTMLDivElement} parent 
     * @param {number} position
     * @returns {[Node, number]}
     */

    static getNodeAndOffsetFromPosition = (parent, position) => {
        const descText = XML.xpath("descendant::text()", parent)

        if (descText.length === 0) {
            return [parent, 0]
        } 

        let sum = 0
        let returnNode = descText[0]
        let offset = 0

        for (let i=0; i<descText.length; i++) {
            const node = descText[i]
            const sumPrior = sum;
            sum += node.textContent.length
            if (sum >= position) {
                returnNode = node
                offset = position - sumPrior;
                break;
            }
        }

        return [returnNode, offset]
    }

    /**
     * 
     * @param {HTMLDivElement} elem 
     */

    static setCaretEnd = elem => {
        const s = window.getSelection()
        const rng = document.createRange()
        const descText = XML.xpath("descendant::text()", elem)
        const lastText = Arr.last(descText)
        if (lastText) {
            rng.setStart(lastText, lastText.textContent.length)
            rng.collapse(false)
            s.removeAllRanges()
            s.addRange(rng)
        } 
        
    }

    /**
     * 
     * @param {Node} node
     * @param {number} offset 
     */
    static setCaretFromNodeOffset = (node, offset) => {
        const s = window.getSelection()
        const rng = document.createRange()
        rng.setStart(node, offset)
        s.removeAllRanges()
        s.addRange(rng)
    }
}
