/**
 * @param {string} query
 * @return {HTMLButtonElement}
 */
const button = query => {
    return document.querySelector("button" + query)
}

/**
 * @param {string} query
 * @return {Array.<HTMLButtonElement>}
 */
const buttons = query => {
    return Array.from(document.querySelectorAll("button" + query))
}


/**
 * @param {string} query
 * @return {HTMLDivElement}
 */
const div = query => {
    return document.querySelector("div" + query)
}


/**
 * @param {string} query
 * @return {HTMLSpanElement}
 */
const span = query => {
    return document.querySelector("span" + query)
}

/**
 * @param {string} query
 * @return {Array.<HTMLSpanElement>}
 */
const spans = query => {
    return Array.from(document.querySelectorAll("span" + query))
}

/**
 * Toggles class of element
 * @param {string} cls
 */
const toggle = cls => (/** @type {HTMLElement}*/ elem) => {
    if (hasClass(cls)(elem)) {
        removeClasses(elem)(cls)
    } else {
        addClasses(elem)(cls)
    }
}


const compressBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("compress-btn"))

const compressionRad = 
    /** @type {HTMLInputElement} */ 
    (document.getElementById("compressionRad"))

const flipBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("flip-btn"))

const textInput1 = 
    /** @type {HTMLDivElement} */ 
    (document.getElementById("text-input1"))

const textInput2 =
    /** @type {HTMLDivElement} */ 
    (document.getElementById("text-input2"))

const messageDiv = div("#message")

const midPointBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("midpoint-btn"))

const midpointRad = 
    /** @type {HTMLInputElement} */ 
    (document.getElementById("midpointRad"))

const notesBtn = button("#notes")

const notesDiv = div("#notes")

const operationForm = 
    /** @type {HTMLFormElement} */ 
    (document.getElementById("operationForm"))

const radioFieldSet = 
    /** @type {HTMLFieldSetElement} */
    (document.getElementById("radioFieldSet"))

const resolvedID1 = 
    /** @type {HTMLSpanElement} */
    (document.getElementById("resolved-id-1"))

const resolvedID2 = 
    /** @type {HTMLSpanElement} */
    (document.getElementById("resolved-id-2"))

const resolvedMidpointID = span("#resolved-midpoint-id")

const result =  
    /** @type {HTMLInputElement} */
    document.getElementById("result")


const textInputDiv = 
    /** @type {HTMLDivElement} */
    document.getElementById("textInputDiv")