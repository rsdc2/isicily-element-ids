import EpiDocElem from "./epidocElem.js";
import Constants from "../../Pure/constants/constants.js";
import { ExistingIDError, NullIDError } from "../../Errors/ids.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";
import Convert from "../../Pure/convert.js";
import Validator from "../../Pure/validator.js";
import { lemmata } from "../../Pure/constants/lemmata.js"


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
        const compressed = Compress.compressID(base)(this.xmlid)
        this.setXMLID({
            id: compressed, 
            override: true,
            existingIDError: false,
            nullIDError: true
        })
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
            this.setXMLID({
                id: newID, 
                override: true, 
                nullIDError: true, 
                existingIDError: false
            })    
        }
    }

    /**
     * Expand the \@xml:id of the element
     * @param {Base} base 
     */
    expandID (base) {
        Validator.assertFullCompressedID(this.xmlid, base)

        const expanded = Compress.decompressID(base)(this.xmlid)
        this.setXMLID({
            id: expanded, 
            override: true, 
            nullIDError: true,
            existingIDError: false
        })
    }

    get form() {
        return this.elem.textContent
    }

    /**
     * Create a new TextElem from an Element
     * @param {Element} elem 
     */
    static fromElem(elem) {
        return new TextElem(elem)
    }

    get lemma() {
        return this.elem.getAttribute("lemma")
    }

    lemmatise() {
        if (Object.keys(lemmata).includes(this.form)) {
            this.elem.setAttribute("lemma", lemmata[this.form])
        }
    }

    removeXMLID() {
        this.elem.removeAttributeNS(XMLNS, "id")
    }

    /**
     * Assign an \@xml:id to the element
     * @param {Object} options
     * @param {string | null} options.id The ID to assign
     * @param {boolean} [options.override = false] Override existing IDs
     * @param {boolean} [options.nullIDError = true] Raise an error if tries to set an ID to null
     * @param {boolean} [options.existingIDError = true] Raise an error if an ID already 
     * @returns {TextElem}
     * exists on the element
     */
    setXMLID({
        id, 
        override = false, 
        nullIDError = true, 
        existingIDError = true
    }) {

        if (id == null && nullIDError) {
            throw new NullIDError("Tried to add an empty ID")
        }

        if (this.xmlid === null || override === true) {
            // Assign ID for the first time, or override
            this.elem.setAttributeNS(XMLNS, "id", id)

        } else if (existingIDError) {
            // Throw an error if element already has an ID
            throw new ExistingIDError(
                this.xmlid,
                this.elem
            )

        } else {
            // Do nothing
            return this
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