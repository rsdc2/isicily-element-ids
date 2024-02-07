import HasXMLElem from "../xml/hasxmlelem.js";
import Constants from "../constants.js";


export default class Ab extends HasXMLElem {
    /**
     * 
     * @param {Element} elem 
     */
    constructor(elem) {
        super(elem)

        this.assertNameNS("ab", Constants.TEINS)
    }

    /**
     * 
     * @param {Element} elem 
     */
    static fromElem(elem) { 
        return new Ab(elem)
    }
}