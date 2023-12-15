/**
 * @param {string} query
 * @return {HTMLDivElement}
 */
const div = query => {
    return document.querySelector(query)
}


/**
 * @param {string} query
 * @return {HTMLSpanElement}
 */
const span = query => {
    return document.querySelector(query)
}

/**
 * @param {string} query
 * @return {Array.<HTMLSpanElement>}
 */
const spans = query => {
    return Array.from(document.querySelectorAll(query))
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
    /** @type {HTMLInputElement} */ 
    (document.getElementById("text-input1"))

const textInput2 =
    /** @type {HTMLInputElement} */ 
    (document.getElementById("text-input2"))

const messageDiv = div("#message")

const midPointBtn = 
    /** @type {HTMLButtonElement} */ 
    (document.getElementById("midpoint-btn"))

const midpointRad = 
    /** @type {HTMLInputElement} */ 
    (document.getElementById("midpointRad"))

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