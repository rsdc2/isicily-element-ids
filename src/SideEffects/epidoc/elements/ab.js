import TextElem from "../textElem.js";
import Constants from "../../../Pure/constants/constants.js";
import HasXMLElem from "../../xml/hasxmlelem.js";
import TextContainer from "../textContainer.js";

export default class Ab extends TextContainer {
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