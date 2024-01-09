
class Elems {

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

    static compressBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("compress-btn"))

    static bodyDiv = Elems.div("#body")

    static compressionRad = 
        /** @type {HTMLInputElement} */ 
        (document.getElementById("compressionRad"))

    static flipBtn = 
        /** @type {HTMLButtonElement} */ 
        (document.getElementById("flip-btn"))

    static textInput1 = 
        /** @type {HTMLDivElement} */ 
        (document.getElementById("text-input1"))

    static textInput2 =
        /** @type {HTMLDivElement} */ 
        (document.getElementById("text-input2"))

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
        /** @type {HTMLInputElement} */
        document.getElementById("result")

    static textInputDiv = 
        /** @type {HTMLDivElement} */
        document.getElementById("textInputDiv")
}
