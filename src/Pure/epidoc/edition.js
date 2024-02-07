import HasXMLElem from "../xml/hasxmlelem.js"
import { ElementTypeError } from "./errors.js"

export default class Edition extends HasXMLElem {
    /**
     * 
     * @param {Element} elem 
     */
    constructor(elem) {
        super(elem)

        this.assertType("edition")
    }

    /**
     * 
     * @param {Element} elem 
     */
    static fromElem(elem) { 
        return new Edition(elem)
    }

}