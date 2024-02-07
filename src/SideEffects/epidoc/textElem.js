
import HasXMLElem from "../xml/hasxmlelem.js";
import Constants from "../../Pure/constants.js";
import { ExistingIDError } from "./errors.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";

const {TEINS, XMLNS} = Constants

/**
 * API for EpiDoc edition elements
 */
export default class TextElem extends HasXMLElem {

    /**
     * Compress the \@xml:id of the element
     * @param {Base} base 
     */
    compressID (base) {

        
        const expanded = Compress.compressID(base)(this.xmlid)
        this.setXMLID(expanded, true, false)
    }

    /**
     * Expand the \@xml:id of the element
     * @param {Base} base 
     */
    expandID (base) {
        const expanded = Compress.decompressID(base)(this.xmlid)
        this.setXMLID(expanded, true, false)
    }

    /**
     * Create a new TextElem from an Element
     * @param {Element} elem 
     */
    static fromElem(elem) {
        return new TextElem(elem)
    }

    /**
     * Assign an \@xml:id to the element
     * @param {string} id The ID to assign
     * @param {boolean} override Override existing IDs
     * @param {boolean} error Raise an error if an ID already 
     * exists on the element
     */
    setXMLID(id, override = false, error = true) {

        if (this.xmlid === null || override === true) {
            // Assign ID for the first time, or override
            this.elem.setAttributeNS(XMLNS, "id", id)

        } else if (error) {
            // Throw an error if element already has an ID
            throw new ExistingIDError(
                this.xmlid,
                this.elem
            )

        } else {
            // Do nothing
            return
        }
    }

    /**
     * Get the \@xml:id attribute value
     * @returns {string}
     */
    get xmlid() {
        return this.elem.getAttributeNS(XMLNS, "id")
    }


}