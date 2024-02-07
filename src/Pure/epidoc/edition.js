import HasXMLElem from "../xml/hasxmlelem.js"
import { ElementTypeError } from "../xml/errors.js"
import EditionElem from "./editionelem.js"
import Constants from "../constants.js"

export default class Edition extends HasXMLElem {
    /**
     * 
     * @param {Element} elem 
     */
    constructor(elem) {
        super(elem)

        this.assertName("div", Constants.TEINS)
        this.assertType("edition")
    }

    /**
     * 
     * @param {Element} elem 
     */
    static fromElem(elem) { 
        return new Edition(elem)
    }

    get descendantElems() {
        const elems = Array.from(this.elem.querySelectorAll('*'))
        return elems.map(EditionElem.fromElem)
    }

    // get xmlIds() {
        
    // }

}