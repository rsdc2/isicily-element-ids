
import EpiDocElem from "./epidocElem.js";
import Constants from "../../Pure/constants.js";
import { ExistingIDError, NullIDError } from "./errors.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";
import Convert from "../../Pure/convert.js";

const {TEINS, XMLNS} = Constants

/**
 * API for text elements that convey document content
 * in an EpiDoc edition; excludes container elements such
 * as <div/> and <ab/> elements.
 */
export default class TextElem extends EpiDocElem {

    /**
     * Compress the \@xml:id of the element
     * @param {Base} base 
     */
    compressID (base) {
        const expanded = Compress.compressID(base)(this.xmlid)
        this.setXMLID(expanded, true, false)
    }

    /**
     * Converts the \@xml:id from the form in one base
     * to the form in another base
     * @param {Base} oldBase 
     * @param {Base} newBase 
     */
    convertID (oldBase, newBase) {
        const oldID = this.xmlid

        // Only convert the ID if one is already present
        if (oldID != null) {
            const newID = Convert.ID(oldBase, newBase)(oldID)
            this.setXMLID(newID, true, false)    
        }
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

        if (id == null) {
            throw new NullIDError("Tried to add an empty ID")
        }

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
     * @returns {string | null}
     */
    get xmlid() {
        return this.elem.getAttributeNS(XMLNS, "id")
    }


}