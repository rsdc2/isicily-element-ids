import EpiDocElem from "./epidocElem.js";
import Constants from "../../Pure/constants/constants.js";
import { ExistingIDError, NullIDError } from "../../Errors/ids.js";
import Base from "../../Pure/base.js";
import Compress from "../../Pure/compress.js";
import Convert from "../../Pure/convert.js";
import Validator from "../../Pure/validator.js";
import "../../Types/typedefs.js"
import { lemmataLatin } from "../../Pure/constants/lemmataLatin.js"
import { lemmataGreek } from "../../Pure/constants/lemmataGreek.js"
import { ISicElementIDError } from "../../Errors/isicElementIDError.js";


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
        const compressed = Compress.compressID(base)(this.xmlID)
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
        const oldID = this.xmlID

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
        Validator.assertFullCompressedID(this.xmlID, base)

        const expanded = Compress.decompressID(base)(this.xmlID)
        this.setXMLID({
            id: expanded, 
            override: true, 
            nullIDError: true,
            existingIDError: false
        })
    }

    get form() {
        return this.elem.textContent.replace(/\s/g, "")
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

    /**
     * Get the @xml:lang attribute of the nearest ancestor
     * <ab> or <div type="edition">
     */
    get xmlLang() {
        const ab = this.ancestorAb
        if (ab == null) {
            throw new ISicElementIDError("No ancestor <ab>")
        }

        const abLang = this.ancestorAb.getAttributeNS(XMLNS, "lang")

        if (abLang != null) {
            return abLang
        }

        const edition = this.ancestorEdition

        if (edition == null) {
            throw new ISicElementIDError("No ancestor <edition>")
        }

        const editionLang = this.ancestorEdition.getAttributeNS(XMLNS, "lang")

        return editionLang
    }

    /**
     * Lemmatise the text element according to the 
     * language of the closest ancestor <ab> 
     * or <div type="edition"> 
     */
    lemmatise() {
        if (this.form == null || this.form === "") {
            return
        }
        if (this.xmlLang === "la") {
            if (Object.keys(lemmataLatin).includes(this.form)) {
                this.elem.setAttribute("lemma", lemmataLatin[this.form])
            }    
        } else if (this.xmlLang === "grc") {
            if (Object.keys(lemmataGreek).includes(this.form)) {
                this.elem.setAttribute("lemma", lemmataGreek[this.form])
            }
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

        if (this.xmlID === null || override === true) {
            // Assign ID for the first time, or override
            this.elem.setAttributeNS(XMLNS, "id", id)

        } else if (existingIDError) {
            // Throw an error if element already has an ID
            throw new ExistingIDError(
                this.xmlID,
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
    get xmlID() {
        return this.elem.getAttributeNS(XMLNS, "id")
    }

}