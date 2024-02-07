import HasXMLElem from "../xml/hasxmlelem.js"
import { ElementAttributeError } from "../xml/errors.js"
import EditionElem from "./editionelem.js"
import Ab from "./ab.js"
import Constants from "../constants.js"

export default class Edition extends HasXMLElem {
    /**
     * 
     * @param {Element} elem 
     */
    constructor(elem) {
        super(elem)

        this.assertNameNS("div", Constants.TEINS)
        this.assertType("edition")
    }

    get abs() {
        const elems = Array.from(this.elem.querySelectorAll('* ab'))
        return elems.map(Ab.fromElem)
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