import Attrs from "./attrs.js"


export default class Elems {

    /**
     * @param {string} query
     * @return {HTMLButtonElement}
     */
    static button = query => {
        return document.querySelector("button" + query)
    }

    /**
     * @param {string} query
     * @return {Array.<HTMLButtonElement>}
     */
    static buttons = query => {
        return Array.from(document.querySelectorAll("button" + query))
    }

    /**
     * @param {string} query
     * @return {HTMLDivElement}
     */
    static div = query => {
        return document.querySelector("div" + query)
    }

    /**
     * @param {string} query
     * @return {HTMLSpanElement}
     */
    static span = query => {
        return document.querySelector("span" + query)
    }

    /**
     * @param {string} query
     * @return {Array.<HTMLSpanElement>}
     */
    static spans = query => {
        return Array.from(document.querySelectorAll("span" + query))
    }

    /**
     * Toggles class of element
     * @param {string} cls
     */
    static toggle = cls => (/** @type {HTMLElement}*/ elem) => {
        if (Attrs.hasClass(cls)(elem)) {
            Attrs.removeClasses(elem)(cls)
        } else {
            Attrs.addClasses(elem)(cls)
        }
    }

    static aboutBtn = Elems.button("#about")

    static aboutDiv = Elems.div("#about")

    static bodyDiv = Elems.div("#body")

    static compressBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("compress-btn"))

    static compressXMLIDBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("compress-xml-id-btn"))
    
    static convertOldIDsBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("convert-old-ids-btn"))

    static convertOldXMLIDsBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("convert-old-xml-ids-btn"))
    
    static convertNewXMLIDsBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("convert-new-xml-ids-btn"))

    static expandXMLIDBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("expand-xml-id-btn"))

    static fileInput = /** @type {HTMLInputElement} */
        (document.getElementById("file-input"))

    static flipBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("flip-btn"))

    static removeAllXMLIDBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("remove-all-xml-id-btn"))

    static setXMLIDBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("set-xml-id-btn"))

    static setMidpointXMLIDBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("set-midpoint-xml-id-btn"))

    static messageDiv = Elems.div("#message")

    static midPointBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("midpoint-btn"))

    static midpointRad = 
        /** @type {HTMLInputElement} */ 
        (document.getElementById("midpointRad"))

    static notesBtn = Elems.button("#notes")

    static notesDiv = Elems.div("#notes")

    static operationForm = 
        /** @type {HTMLFormElement} */ 
        (document.getElementById("operationForm"))

    static radioFieldSet = 
        /** @type {HTMLFieldSetElement} */
        (document.getElementById("radioFieldSet"))

    static resolvedID1 = 
        /** @type {HTMLSpanElement} */
        (document.getElementById("resolved-id-1"))

    static resolvedID2 = 
        /** @type {HTMLSpanElement} */
        (document.getElementById("resolved-id-2"))

    static resolvedMidpointID = Elems.span("#resolved-midpoint-id")

    static result =  
        /** @type {HTMLSpanElement} */
        document.getElementById("result")

    static textInput1 = 
    /** @type {HTMLDivElement} */ 
    (document.getElementById("text-input1"))

    static textInput2 =
        /** @type {HTMLDivElement} */ 
        (document.getElementById("text-input2"))

    static textInputDiv = 
        /** @type {HTMLDivElement} */
        document.getElementById("textInputDiv")
}
