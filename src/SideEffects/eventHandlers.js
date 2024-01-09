import { 
    ABOUTTEXT,
    BLANKCOMPRESSION,
    BLANKISIC, 
    BLANKMIDPOINT,
    EQ,
    FIVEBLANKS,
    METAKEYS, 
    NOTESTEXT,
    REST
} from "../Pure/constants";

import {
    BASE100,
    baseToDec,
    decToBase,
    midPointBetweenValues
} from "../Pure/bases"

import { selectionMode } from "./elementValues";

import * as Select from "./selection.js"
import * as Es from "./elements.js"
import * as Validate from "../Pure/validate"
import * as Err from "../Pure/errors"
import * as Format from "../Pure/formatting"
import { 
    activate, 
    addClasses, 
    deactivate, 
    disable, 
    enable, 
    hasClass, 
    hide, 
    removeClasses, 
    show
} from "./elementAttributes"

import { Message } from "./messageAlert"

import {
    aboutBtn,
    aboutDiv,
    compressBtn,
    div,
    flipBtn,
    midPointBtn,
    notesBtn,
    notesDiv,
    resolvedID1,
    resolvedID2,
    resolvedMidpointID,
    result,
    textInput1,
    textInput2,

} from "./elements.js"

/**
 * Returns target input from an event:
 * ignores meta keys
 * @param {KeyboardEvent | MouseEvent | InputEvent} e 
 * @returns {HTMLDivElement | null}
 */
const getTargetInput = (e) => {
    const target = /** @type {HTMLElement} */ (e.target) 

    let targetInput = target.id === Es.textInput1.id ? Es.textInput1 : 
                                        target.id === Es.textInput2.id ? Es.textInput2 :
                                            null 

    if (targetInput === null) return;

    if (["keydown", "keypress", "keyup"].includes(e.type)) {
        const keyE = /** @type {KeyboardEvent} */ (e)
        
        if (METAKEYS.includes(keyE.key)) {
            return 
        }
        
        if (keyE.ctrlKey) {
            if (keyE.key === "v" || keyE.key === "ω") {
                return getTargetInputFromSplittingLongID(
                    targetInput, 
                    targetInput.textContent
                )
            } else if (keyE.key === "Backspace") {
                return targetInput
            } else {
                return 
            }
        }
    }

    return targetInput

}

/**
 * Displays a long ID appropriately in the two textboxes; 
 * returns the Div that should receive the focus;
 * NB: this has side effects in compression mode
 * @param {HTMLDivElement} defaultElem
 * @param {string} longID with document ID and token ID 
 * @returns {HTMLDivElement} new target element
 */
const getTargetInputFromSplittingLongID = (defaultElem, longID) => {
    const matches = longID.trim().matchAll(/(^ISic0[0-9]{5,5})-([0-9]{0,5})$/g).next()
    if (matches.value) {
        Es.textInput1.textContent = matches.value[1]
        Es.textInput2.textContent = matches.value[2]    
        if (selectionMode() == "compression") {
            show(Es.textInput2, Es.result)
        }
        return Es.textInput2
    }

    if (selectionMode() == "compression") {
        hide(Es.result, Es.textInput2)
        reset(Es.result, Es.textInput2)
    }
    return defaultElem
}



/**
 * 
 * @param {KeyboardEvent} e 
 */
export const handleChangeFocus = (e) => {

    const target = /** @type {HTMLElement} */ (e.target)

    if (METAKEYS.includes(e.key) || (e.ctrlKey && e.key !== "v")) {
        return
    }

    const changeFocus = () => {Es.textInput1.blur(); Es.textInput2.focus()}

    switch (target.id) {
        case Es.textInput1.id:
            if (Validate.validateISicilyNumber(Es.textInput1.textContent) && selectionMode() === "compression") changeFocus()
            if (Validate.validateShortID(Es.textInput1.textContent) && selectionMode() === "midpoint") changeFocus()

            break;
        case Es.textInput2.id:
            if (Validate.validateISicilyTokenNumber(Es.textInput2.textContent) && selectionMode() === "compression") Es.textInput2.blur()
            if (Validate.validateShortID(Es.textInput2.textContent) && selectionMode() === "midpoint") Es.textInput2.blur()
    }
}

/**
 * 
 */
const handleCompression = () => {

    if (Validate.validateShortID(Es.textInput1.textContent)) {
        Message.hide()
        Es.resolvedID1.innerHTML = Format.insertISic(String(baseToDec(Es.textInput1.textContent, BASE100)))
    } else if (Es.textInput1.textContent.trim() === "") {
        Es.resolvedID1.innerHTML = BLANKCOMPRESSION
        hide(Es.result, Es.textInput2)
        reset(Es.textInput2, Es.result)
        removeClasses(result, textInput2)("five", "one")  
    } else if (Validate.containsOnlyLetters(textInput1.textContent)) {
        resolvedID1.innerHTML = BLANKISIC
        hide(result, textInput2)
        reset(textInput2, result)
        removeClasses(result, textInput2)("five", "one")   
    } else if (Validate.isDecimal(textInput1.textContent)) {
        Message.hide()
        textInput1.textContent = "ISic" + textInput1.textContent
        Select.setCaretEnd(textInput1)
        handleCompression()

    } else if (Validate.validatePartialLongID(textInput1.textContent)) {
        Message.hide()
        result.textContent = "-"
        const inpt = textInput1.textContent + "-" + textInput2.textContent
        addClasses(textInput2)("five")
        addClasses(result)("valid", "one")
        show(result, textInput2)

        if (Validate.validateLongID(inpt)) {
            resolvedID1.innerHTML = Format.formatGreek(Format.padShortID(BASE100, decToBase(BigInt(Format.removeISic(inpt)), BASE100)))
        } else {
            resolvedID1.innerHTML = FIVEBLANKS
        }
 
 
    } else {
        resolvedID1.innerHTML = BLANKCOMPRESSION
        hide(result, textInput2)
        reset(textInput2, result)
        removeClasses(result, textInput2)("five", "one")
    }
}


/**
 * Makes sure that the Flip button is disabled / enabled appropriately
 */
const handleCheckFlip = () => {
    if ((Validate.validate(textInput1) || 
    Validate.validateLongID(textInput1.textContent + "-" + textInput2.textContent)) && Validate.validate(resolvedID1)) {

        enable(flipBtn)
    } else {
        disable(flipBtn)
    }
}


/**
 * 
 */
export const handleFlip = () => {
    if (selectionMode() === "compression") {
        const resolved = resolvedID1
            .textContent
            .replace(`${EQ}`, "")
            .replace("?", "")

        if (Validate.validateShortID(resolved)) {
            textInput1.textContent = resolved
            reset(textInput2, result)
            hide(textInput2, result)
        } else

        if (Validate.validateLongID(resolved)) {
            getTargetInputFromSplittingLongID(textInput1, resolved)
        }
                                    
        handleCompression()    
        handleValidateCompression()
        handleGreekFormatting(textInput1, null)
    }
}


/**
 * Underlines Greek text and makes sure that the caret
 * stays in the correct position
 * @param {HTMLDivElement} elem 
 * @param {KeyboardEvent | MouseEvent | InputEvent | null} e
 */
const handleGreekFormatting = (elem, e) => {
    result.innerHTML = Format.formatGreek(result.textContent)

    if (e != null && e.type === "keyup") {
        const keyE = /** @type {KeyboardEvent} */ (e)
        if (keyE.ctrlKey && (keyE.key === "v" || keyE.key === "ω")) {
            elem.innerHTML = Format.formatGreek(elem.textContent) 
            Select.setCaretEnd(elem)
            return
        }
    }

    const position = Select.getCaretPosition(elem.id)
    elem.innerHTML = Format.formatGreek(elem.textContent) 
    const [n, offset] = Select.getNodeAndOffsetFromPosition(elem, position)
    Select.setCaretFromNodeOffset(n, offset)    
     
}

export const handleHover = () => {
    switch (selectionMode()) {
        case "compression":
            handleValidateCompression()
            break;

        case "midpoint":
            handleMidpoint()
            break;
    }
}


export const handleMidpoint = () => {
    const text1 = textInput1.textContent
    const text2 = textInput2.textContent

    const text1Dec = baseToDec(text1, BASE100)
    const text2Dec = baseToDec(text2, BASE100)
    
    let midpointValid = true
    
    let [textInput1Err, text1Status] = Err.getShortIDValidationIndividual(text1)
    let [textInput2Err, text2Status] = Err.getShortIDValidationIndividual(text2)
    if (textInput1Err) resolvedID1.textContent = Format.insertISic(String(text1Dec))
    if (textInput2Err) resolvedID1.textContent = Format.insertISic(String(text2Dec))

    if (textInput1Err === Err.ERR.ISVALID) {
        resolvedID1.textContent = Format.insertISic(String(text1Dec))
        Message.hide()
    } else {
        resolvedID1.textContent = BLANKISIC
        resolvedMidpointID.textContent = BLANKISIC
        midpointValid = false

        if (textInput1Err === Err.ERR.CONTAINSNUMERAL) {
            Message.alert(Err.containsNumeralErr("1"))
        }
    }

    if (textInput2Err === Err.ERR.ISVALID) {
        resolvedID2.textContent = Format.insertISic(String(text2Dec))
        Message.hide()
    } else {
        resolvedID2.textContent = BLANKISIC
        resolvedMidpointID.textContent = BLANKISIC
        midpointValid = false
    }

    if (textInput1Err === Err.ERR.CONTAINSNUMERAL || textInput2Err === Err.ERR.CONTAINSNUMERAL) {
        Message.alert(Err.containsNumeralErr(""))
        midpointValid = false
    }

    if (textInput1Err === Err.ERR.CONTAINSSPECIAL || textInput2Err === Err.ERR.CONTAINSSPECIAL) {
        Message.alert(Err.containsSpecialErr(""))
        midpointValid = false
    }

    if (Err.isGenericErr(textInput1Err, textInput2Err)) {
        Message.hide()
    }

    if (text1Dec > text2Dec) {
        text1Status = text1Status.concat("\nThis ID comes after the second ID")
        text2Status = text2Status.concat("\nThis ID comes before the first ID")
        if (Validate.validate(textInput1) && Validate.validate(textInput2)) {
            Message.alert("First ID comes after second ID")
        }
        midpointValid = false
    }

    if (text1Dec === text2Dec) {
        text1Status = text1Status.concat("\nERROR: This ID is equal to the second ID")
        text2Status = text2Status.concat("\nERROR: This ID is equal to the first ID.")
        if (Validate.validate(textInput1) && Validate.validate(textInput2)) {
            Message.alert("IDs are equal")
        }
        midpointValid = false
    }

    if (text1Dec === text2Dec + 1n || text1Dec === text2Dec - 1n) {
        text1Status = text1Status.concat("\nERROR: There are no positions in between these IDs")
        text2Status = text2Status.concat("\nERROR: There are no positions in between these IDs")
        if (Validate.validate(textInput1) && Validate.validate(textInput2)) {
            Message.alert("No IDs between the two values")
        }
        midpointValid = false
    }

    textInput1.setAttribute("title", text1Status)
    textInput2.setAttribute("title", text2Status)

    if (midpointValid) {
        addClasses(result)("valid")

        const midpoint = midPointBetweenValues(
            textInput1.textContent, 
            textInput2.textContent, 
            BASE100
        )
        result.innerHTML = 
            `${REST}`.concat(Format.formatGreek(midpoint), `${REST}`
            )
        
        resolvedMidpointID.textContent = Format.insertISic(String(baseToDec(midpoint, BASE100)))

    } else {
        removeClasses(result)("valid")
        result.textContent = BLANKMIDPOINT
        resolvedMidpointID.textContent = BLANKISIC
    }

}


/**
 * 
 * @returns 
 */

export const selection = () => {
    hide(div(".input"))

    switch (selectionMode()) {
        case "compression":
            handleCompression()
            hide(textInput2, result, resolvedID2, resolvedMidpointID)
            removeClasses(textInput1, textInput2)("five")
            handleCheckFlip()
            break

        case "midpoint":
            handleMidpoint()
            show(textInput2, result, resolvedID2, resolvedMidpointID)
            disable(flipBtn)
            addClasses(textInput1, textInput2)("five")
            break

    }

    show(div(".input"))
}


/**
 * 
 * @param {MouseEvent} e 
 */
export const handleToggleMode = (e) => {

    const target = /** @type {HTMLElement} */ (e.target)  

    switch (target.id) {
        case compressBtn.id:
            reset(textInput2, result)
            
            if (selectionMode() == "midpoint") {
                activate(compressBtn)
                deactivate(midPointBtn)
                textInput1.focus()
                Select.setCaretEnd(textInput1)
                addClasses(textInput2)("five")
                addClasses(result)("one")
                handleValidateCompression()
            }
            else {
                resetInputs()
            }
            break;

        case midPointBtn.id:

            if (selectionMode() == "compression") {
                if (Validate.containsNumerals(textInput1.textContent)) {
                    resetInputs()
                }
                activate(midPointBtn)
                deactivate(compressBtn)    
                textInput1.focus()
                Select.setCaretEnd(textInput1)
                removeClasses(result)("five", "one")
                resetStatusTips()
            } 
            else {
                resetInputs()
            }
            break;

        default:
            break;
    }    

    selection()

}

/**
 * 
 * @param {Event} e 
 */
export const handleToggleShowAbout = (e) => {
    e.stopPropagation()

    if (hasClass("hidden")(aboutDiv)) {
        aboutDiv.innerHTML = ABOUTTEXT
        removeClasses(aboutDiv)("hidden")
        activate(aboutBtn)
    } else {
        addClasses(aboutDiv)("hidden")
        deactivate(aboutBtn)
    }
}

/**
 * 
 * @param {Event} e 
 */
export const handleToggleShowNotes = (e) => {
    e.stopPropagation()
    if (hasClass("hidden")(notesDiv)) {
        notesDiv.innerHTML = NOTESTEXT
        removeClasses(notesDiv)("hidden")
        activate(notesBtn)
    } else {
        addClasses(notesDiv)("hidden")
        deactivate(notesBtn)
    }
}


/**
 * Event may be either MouseEvent or InputEvent
 * @param {MouseEvent | InputEvent | KeyboardEvent} e
 */

export const handleUpdateInput = (e) => {

    const targetInput = getTargetInput(e)

    if (targetInput == null) {
        return
    }

    switch (selectionMode()) {
        case "compression":
            handleCompression()
            handleValidateCompression()
            handleCheckFlip()
            break;

        case "midpoint":
            if (Validate.validateShortID(targetInput.textContent)) {
                addClasses(targetInput)("valid")
            }
            else {
                removeClasses(targetInput)("valid")
            }     

            handleMidpoint()
            break;
    }

    handleGreekFormatting(targetInput, e)


}

const handleValidateCompression = () => {
    let v1StatusComp = ""

    if (Validate.validate(textInput1)) {
        v1StatusComp = "This ID is valid"
    } else {
        v1StatusComp = "This ID is not valid"
    }

    if (Validate.validateISicilyNumber(textInput1.textContent) || 
    Validate.validateShortID(textInput1.textContent)) {

        addClasses(textInput1)("valid")

    } else {
        removeClasses(textInput1)("valid")
    }

    if (Validate.validateISicilyTokenNumber(textInput2.textContent)) {
        addClasses(textInput2)("valid")             
    }  else {
        removeClasses(textInput2)("valid")
    }

    textInput1.setAttribute("title", v1StatusComp)
}

export const hideAllPopups = () => {
    deactivate(aboutBtn, notesBtn)
    hide(aboutDiv, notesDiv)
}

/**
 * 
 * @param {Array.<HTMLDivElement> | Array.<HTMLSpanElement>} divs 
 */
const reset = (...divs) => {

    divs.forEach ( div => div.innerHTML = "" )
}

/**
 * Resets the text of the tooltips for the input elements
 */
const resetInputs = () => {
    resetStatusTips()
    reset(textInput1, textInput2, result)
}

const resetStatusTips = () => {
    textInput1.setAttribute("title", "")
    textInput2.setAttribute("title", "")
}