import Ab from "./ab.js"
import Constants from "../../../Pure/constants/constants.js"
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

    get descendantTextElems() {
        return this.abs.flatMap(ab => ab.descendantTextElems)
    }

}