import HasXMLElem from "../../../Pure/xml/hasxmlelem.js"
import { ElementAttributeError } from "../../../Pure/xml/errors.js"
import TextElem from "../textElem.js"
import Ab from "./ab.js"
import Constants from "../../../Pure/constants.js"
import TextContainer from "../textContainer.js"

export default class Edition extends TextContainer {
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

    get descendantEditionElems() {
        return this.descendants.map(TextElem.fromElem)
    }

    // get xmlIds() {
        
    // }

}