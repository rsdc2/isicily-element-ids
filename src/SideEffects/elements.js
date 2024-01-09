import * as Attrs from "./elementAttributes"
/**
 * @param {string} query
 * @return {HTMLButtonElement}
 */
export const button = query => {
    return document.querySelector("button" + query)
}

/**
 * @param {string} query
 * @return {Array.<HTMLButtonElement>}
 */
export const buttons = query => {
    return Array.from(document.querySelectorAll("button" + query))
}


/**
 * @param {string} query
 * @return {HTMLDivElement}
 */
export const div = query => {
    return document.querySelector("div" + query)
}


/**
 * @param {string} query
 * @return {HTMLSpanElement}
 */
export const span = query => {
    return document.querySelector("span" + query)
}

/**
 * @param {string} query
 * @return {Array.<HTMLSpanElement>}
 */
export const spans = query => {
    return Array.from(document.querySelectorAll("span" + query))
}

/**
 * Toggles class of element
 * @param {string} cls
 */
export const toggle = cls => (/** @type {HTMLElement}*/ elem) => {
    if (Attrs.hasClass(cls)(elem)) {
        Attrs.removeClasses(elem)(cls)
    } else {
        Attrs.addClasses(elem)(cls)
    }
}

export const aboutBtn = button("#about")

export const aboutDiv = div("#about")

export const compressBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("compress-btn"))

export const bodyDiv = div("#body")

export const compressionRad = 
    /** @type {HTMLInputElement} */ 
    (document.getElementById("compressionRad"))

export const flipBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("flip-btn"))

export const textInput1 = 
    /** @type {HTMLDivElement} */ 
    (document.getElementById("text-input1"))

export const textInput2 =
    /** @type {HTMLDivElement} */ 
    (document.getElementById("text-input2"))

export const messageDiv = div("#message")

export const midPointBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("midpoint-btn"))

export const midpointRad = 
    /** @type {HTMLInputElement} */ 
    (document.getElementById("midpointRad"))

export const notesBtn = button("#notes")

export const notesDiv = div("#notes")

export const operationForm = 
    /** @type {HTMLFormElement} */ 
    (document.getElementById("operationForm"))

export const radioFieldSet = 
    /** @type {HTMLFieldSetElement} */
    (document.getElementById("radioFieldSet"))

export const resolvedID1 = 
    /** @type {HTMLSpanElement} */
    (document.getElementById("resolved-id-1"))

export const resolvedID2 = 
    /** @type {HTMLSpanElement} */
    (document.getElementById("resolved-id-2"))

export const resolvedMidpointID = span("#resolved-midpoint-id")

export const result =  
    /** @type {HTMLInputElement} */
    document.getElementById("result")

export const textInputDiv = 
    /** @type {HTMLDivElement} */
    document.getElementById("textInputDiv")