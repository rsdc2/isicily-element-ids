import Base from "../Pure/base.js"
import Compress from "../Pure/compress.js"
import Format from "../Pure/format.js"
import Select from "./select.js"
import Validator from "../Pure/validator.js"
import Constants from "../Pure/constants/constants.js"
import Err from "../Pure/err.js"
import Elems from "./elems.js"
import Attrs from "./attrs.js"
import Status from "./status.js"
import Message from "./message.js"
import Elem from "./elem.js"
import { ISicElementIDError } from "../Errors/isicElementIDError.js"
import { NoSelectionError } from "../Errors/selection.js"
import { ValidationError
 } from "../Errors/validation.js"

const {
    BLANKCOMPRESSION,
    BLANKISIC,
    BLANKMIDPOINT,
    EQ,
    REST,
    FIVEBLANKS,
    METAKEYS
} = Constants

const base = new Base(Constants.CURRENTBASE)
const compress = Compress.compressID(base)
const decompress = Compress.decompressID(base)

export default class Handlers {
    /**
     * Returns target input from an event:
     * ignores meta keys
     * @param {KeyboardEvent | MouseEvent | InputEvent} e 
     * @returns {HTMLDivElement | null}
     */
    static getTargetInput = (e) => {
        const target = /** @type {HTMLElement} */ (e.target) 

        let targetInput = target.id === Elems.textInput1.id ? Elems.textInput1 : 
                                            target.id === Elems.textInput2.id ? Elems.textInput2 :
                                                null 

        if (targetInput === null) return null;

        if (["keydown", "keypress", "keyup"].includes(e.type)) {
            const keyE = /** @type {KeyboardEvent} */ (e)
            
            if (METAKEYS.includes(keyE.key)) {
                return null
            }
            
            if (keyE.ctrlKey) {
                if (keyE.key === "v" || keyE.key === "ω") {
                    return Handlers.getTargetInputFromSplittingLongID(
                        targetInput, 
                        targetInput.textContent || ""
                    )
                } else if (keyE.key === "Backspace") {
                    return targetInput
                } else {
                    return null
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
    static getTargetInputFromSplittingLongID = (defaultElem, longID) => {
        const matches = longID.trim().matchAll(/(^ISic0[0-9]{5,5})-([0-9]{0,5})$/g).next()
        if (matches.value) {
            Elems.textInput1.textContent = matches.value[1]
            Elems.textInput2.textContent = matches.value[2]    
            if (Status.selectionMode() == "compression") {
                Attrs.show(Elems.textInput2, Elems.result)
            }
            return Elems.textInput2
        }

        if (Status.selectionMode() == "compression") {
            Attrs.hide(Elems.result, Elems.textInput2)
            Handlers.reset(Elems.result, Elems.textInput2)
        }
        return defaultElem
    }



    /**
     * 
     * @param {KeyboardEvent} e 
     */
    static handleChangeFocus = (e) => {

        const target = /** @type {HTMLElement} */ (e.target)
        const { textInput1, textInput2 } = Elems

        if (METAKEYS.includes(e.key) || (e.ctrlKey && e.key !== "v")) {
            return
        }

        const changeFocus = () => {
            Elems.textInput1.blur(); 
            Elems.textInput2.focus()
        }

        switch (target.id) {
            case Elems.textInput1.id:
                if (Validator.iSicilyDocID(textInput1.textContent) && Status.selectionMode() === "compression") {
                    changeFocus()
                }
                if (Validator.shortID(textInput1.textContent, base) && Status.selectionMode() === "midpoint") {
                    changeFocus()
                }

                break;
            case Elems.textInput2.id:
                if (Validator.iSicilyElemID(textInput2.textContent, base) && Status.selectionMode() === "compression") {
                    Elems.textInput2.blur()
                }
                if (Validator.shortID(textInput2.textContent, base) && Status.selectionMode() === "midpoint") {
                    Elems.textInput2.blur()
                }
        }
    }

    /**
     * Handles both compression and decompression of IDs in 
     * compression mode (i.e. not finding midpoint)
     */
    static handleCompression = () => {
        const { resolvedID1,result, textInput1, textInput2 } = Elems
    
        try {
            if (Validator.shortID(textInput1.textContent, base)) {
                // Handle decompression
                Message.hide()
                resolvedID1.textContent = decompress(
                    textInput1.textContent
                )
            
            } else if (textInput1.textContent.trim() === "") {
                // Handle empty input box
                resolvedID1.textContent = BLANKCOMPRESSION
                Attrs.hide(result, textInput2)
                Handlers.reset(textInput2, result)
                Attrs.removeClasses(result, textInput2)("five", "one")  
    
            } else if (Validator.containsOnlyLetters(textInput1.textContent)) {
                resolvedID1.textContent = BLANKISIC
                Attrs.hide(result, textInput2)
                Handlers.reset(textInput2, result)
                Attrs.removeClasses(result, textInput2)("five", "one")   
    
            } else if (Validator.isDecimal(Elems.textInput1.textContent)) {
                Message.hide()
                textInput1.textContent = "ISic" + textInput1.textContent
                Select.setCaretEnd(textInput1)
                Handlers.handleCompression()
    
            } else if (Validator.partialLongID(textInput1.textContent)) {
                Message.hide()
                Elems.result.textContent = "-"
                const inpt = textInput1.textContent + "-" + textInput2.textContent
                Attrs.addClasses(textInput2)("five")
                Attrs.addClasses(result)("valid", "one")
                Attrs.show(result, textInput2)
    
                if (Validator.longID(inpt, base)) {
                    resolvedID1.textContent = compress(inpt)
                    Elem.highlightGreekInDiv(resolvedID1)
                } else {
                    resolvedID1.textContent = FIVEBLANKS
                }
        
        
            } else {
                resolvedID1.textContent = BLANKCOMPRESSION
                Attrs.hide(result, textInput2)
                Handlers.reset(textInput2, result)
                Attrs.removeClasses(result, textInput2)("five", "one")
            }
    
        } catch (error) {
            // Ignore validation errors, since these are handled 
            // by the above routines
            if (error instanceof ValidationError) {

            } else if (error instanceof ISicElementIDError) {
                Message.alert (error.message)
            
            } else {
                Message.alert("Unknown error. Please refer to the developer console")
                throw error
            }
        }
    }


    /**
     * Makes sure that the Flip button is disabled / enabled appropriately
     */
    static handleCheckFlip = () => {
        const { 
            flipBtn, 
            resolvedID1, 
            textInput1, 
            textInput2 
        } = Elems
        
        if (
            (Validator.validate(textInput1, base) || 
                Validator.longID(
                    textInput1.textContent + "-" + 
                    textInput2.textContent, base
                )
            ) && Validator.validate(resolvedID1, base)) {

            Attrs.enable(flipBtn)
        } else {
            Attrs.disable(flipBtn)
        }
    }


    /**
     * In compression mode, flip between compressed and 
     * expanded IDs
     */
    static handleFlip = () => {
        const { resolvedID1 } = Elems

        if (Status.selectionMode() === "compression") {
            const resolved = resolvedID1
                .textContent
                .replace(`${EQ}`, "")
                .replace("?", "")

            if (Validator.shortID(resolved, base)) {
                Elems.textInput1.textContent = resolved
                Handlers.reset(Elems.textInput2, Elems.result)
                Attrs.hide(Elems.textInput2, Elems.result)
            } else

            if (Validator.longID(resolved, base)) {
                Handlers.getTargetInputFromSplittingLongID(Elems.textInput1, resolved)
            }
                                        
            Handlers.handleCompression()    
            Handlers.handleValidatorCompression()
            Handlers.handleGreekFormatting(Elems.textInput1, null)
        }
    }


    /**
     * Underlines Greek text and makes sure that the caret
     * stays in the correct position
     * @param {HTMLDivElement} elem 
     * @param {KeyboardEvent | MouseEvent | InputEvent | null} e
     */
    static handleGreekFormatting = (elem, e) => {
        Elem.highlightGreekInDiv(Elems.result)

        if (e != null && e.type === "keyup") {
            const keyE = /** @type {KeyboardEvent} */ (e)
            if (keyE.ctrlKey && (keyE.key === "v" || keyE.key === "ω")) {
                Elem.highlightGreekInDiv(elem)
                Select.setCaretEnd(elem)
                return
            }
        }

        try {
            const position = Select.getCaretPosition(elem.id)
            Elem.highlightGreekInDiv(elem)
            const [n, offset] = Select.getNodeAndOffsetFromPosition(elem, position)
            Select.setCaretFromNodeOffset(n, offset)    
        } catch (error) {
            if (error instanceof NoSelectionError) {
                // If there is no selection, nothing to do
            } else {
                throw error
            }
        }
        
    }

    static handleHover = () => {
        switch (Status.selectionMode()) {
            case "compression":
                Handlers.handleValidatorCompression()
                break;

            case "midpoint":
                Handlers.handleMidpoint()
                break;
        }

        
    }


    static handleMidpoint = () => {
        
        const {
            resolvedID1, 
            resolvedID2,
            resolvedMidpointID,
            textInput1,
            textInput2
        } = Elems

        const text1 = textInput1.textContent || ""
        const text2 = textInput2.textContent || ""

        let midpointValid = true

        // Check that inputs are individually valid IDs
        let [textInput1Err, text1Status] = Err.getShortIDValidationIndividual(text1, base)
        let [textInput2Err, text2Status] = Err.getShortIDValidationIndividual(text2, base)

        if (textInput1Err) resolvedID1.textContent = decompress(text1)

        if (textInput2Err) resolvedID1.textContent = decompress(text2)

        if (textInput1Err === Err.ERR.ISVALID) {
            resolvedID1.textContent = decompress(text1)
            Message.hide()
        } else {
            resolvedID1.textContent = BLANKISIC
            resolvedMidpointID.textContent = BLANKISIC
            midpointValid = false

            if (textInput1Err === Err.ERR.CONTAINSNUMERAL) {
                Message.error(Err.containsNumeralErr("1"))
            }
        }

        if (textInput2Err === Err.ERR.ISVALID) {
            resolvedID2.textContent = decompress(text2)
            Message.hide()
        } else {
            resolvedID2.textContent = BLANKISIC
            resolvedMidpointID.textContent = BLANKISIC
            midpointValid = false
        }

        if (textInput1Err === Err.ERR.CONTAINSNUMERAL || textInput2Err === Err.ERR.CONTAINSNUMERAL) {
            Message.error(Err.containsNumeralErr(""))
            midpointValid = false
        }

        if (textInput1Err === Err.ERR.CONTAINSSPECIAL || textInput2Err === Err.ERR.CONTAINSSPECIAL) {
            Message.error(Err.containsSpecialErr(""))
            midpointValid = false
        }

        if (Err.isGenericErr(textInput1Err, textInput2Err)) {
            Message.hide()
        }

        // Check that IDs are sequential etc.
        const text1Dec = base.toDec(text1)
        const text2Dec = base.toDec(text2)

        if (text1Dec > text2Dec) {
            text1Status = text1Status.concat("\nThis ID comes after the second ID")
            text2Status = text2Status.concat("\nThis ID comes before the first ID")
            if (Validator.validate(textInput1, base) && Validator.validate(textInput2, base)) {
                Message.error("First ID comes after second ID")
            }
            midpointValid = false
        }

        if (text1Dec === text2Dec) {
            text1Status = text1Status.concat("\nERROR: This ID is equal to the second ID")
            text2Status = text2Status.concat("\nERROR: This ID is equal to the first ID.")
            if (Validator.validate(textInput1, base) && Validator.validate(textInput2, base)) {
                Message.error("IDs are equal")
            }
            midpointValid = false
        }

        if (text1Dec === text2Dec + 1 || text1Dec === text2Dec - 1) {
            text1Status = text1Status.concat("\nERROR: There are no positions in between these IDs")
            text2Status = text2Status.concat("\nERROR: There are no positions in between these IDs")
            if (Validator.validate(textInput1, base) 
                    && Validator.validate(textInput2, base)) {
                
                Message.error("No IDs between the two values")
            }
            midpointValid = false
        }

        Elems.textInput1.setAttribute("title", text1Status)
        Elems.textInput2.setAttribute("title", text2Status)

        if (midpointValid) {
            Attrs.addClasses(Elems.result)("valid")

            const midpoint = base.midPointBetweenValues(
                Elems.textInput1.textContent, 
                Elems.textInput2.textContent
            )

            const paddedMidpoint = Format.padShortID(base.zero, midpoint)

            const span = Format.highlightGreekFromStr(paddedMidpoint)
            Elem.clear(Elems.result)
            Elems.result.append(REST, span, REST)
            
            resolvedMidpointID.textContent = decompress(midpoint)

        } else {
            Attrs.removeClasses(Elems.result)("valid")
            Elems.result.textContent = BLANKMIDPOINT
            resolvedMidpointID.textContent = BLANKISIC
        }

    }

    /**
     * 
     * @returns 
     */

    static selection = () => {
        const { div, flipBtn, resolvedID2, resolvedMidpointID } = Elems

        Attrs.hide(div(".input"))

        switch (Status.selectionMode()) {
            case "compression":
                Handlers.handleCompression()
                Attrs.hide(Elems.textInput2, Elems.result, resolvedID2, resolvedMidpointID)
                Attrs.removeClasses(Elems.textInput1, Elems.textInput2)("five")
                Handlers.handleCheckFlip()
                break

            case "midpoint":
                Handlers.handleMidpoint()
                Attrs.show(Elems.textInput2, Elems.result, resolvedID2, resolvedMidpointID)
                Attrs.disable(flipBtn)
                Attrs.addClasses(Elems.textInput1, Elems.textInput2)("five")
                break

        }

        Attrs.show(div(".input"))
    }


    /**
     * 
     * @param {MouseEvent} e 
     */
    static  handleToggleMode = (e) => {

        const target = /** @type {HTMLElement} */ (e.target)  

        switch (target.id) {
            case Elems.compressBtn.id:
                Handlers.reset(Elems.textInput2, Elems.result)
                
                if (Status.selectionMode() == "midpoint") {
                    Attrs.activate(Elems.compressBtn)
                    Attrs.deactivate(Elems.midPointBtn)
                    Elems.textInput1.focus()
                    Select.setCaretEnd(Elems.textInput1)
                    Attrs.addClasses(Elems.textInput2)("five")
                    Attrs.addClasses(Elems.result)("one")
                    Handlers.handleValidatorCompression()
                }
                else {
                    Handlers.resetInputs()
                }
                break;

            case Elems.midPointBtn.id:

                if (Status.selectionMode() == "compression") {
                    if (Validator.containsNumerals(Elems.textInput1.textContent)) {
                        Handlers.resetInputs()
                    }
                    Attrs.activate(Elems.midPointBtn)
                    Attrs.deactivate(Elems.compressBtn)    
                    Elems.textInput1.focus()
                    Select.setCaretEnd(Elems.textInput1)
                    Attrs.removeClasses(Elems.result)("five", "one")
                    Handlers.resetStatusTips()
                } 
                else {
                    Handlers.resetInputs()
                }
                break;

            default:
                break;
        }    

        Handlers.selection()

    }

    /**
     * 
     * @param {Event | undefined} e 
     */
    static handleToggleShowAbout = (e) => {

        if (e != undefined) {
            e.stopPropagation()
        }

        if (Attrs.hasClass("hidden")(Elems.aboutDiv)) {
            Attrs.removeClasses(Elems.aboutDiv)("hidden")
            Attrs.activate(Elems.aboutBtn)
        } else {
            Attrs.addClasses(Elems.aboutDiv)("hidden")
            Attrs.deactivate(Elems.aboutBtn)
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    static handleToggleShowNotes = (e) => {
        e.stopPropagation()
        if (Attrs.hasClass("hidden")(Elems.notesDiv)) {
            Attrs.removeClasses(Elems.notesDiv)("hidden")
            Attrs.activate(Elems.notesBtn)
        } else {
            Attrs.addClasses(Elems.notesDiv)("hidden")
            Attrs.deactivate(Elems.notesBtn)
        }
    }


    /**
     * Event may be either MouseEvent or InputEvent
     * @param {MouseEvent | InputEvent | KeyboardEvent} e
     */

    static handleUpdateInput = (e) => {

        const targetInput = Handlers.getTargetInput(e)

        if (targetInput == null) {
            return
        }

        switch (Status.selectionMode()) {
            case "compression":
                Handlers.handleCompression()
                Handlers.handleValidatorCompression()
                Handlers.handleCheckFlip()
                break;

            case "midpoint":
                if (Validator.shortID(targetInput.textContent, base)) {
                    Attrs.addClasses(targetInput)("valid")
                }
                else {
                    Attrs.removeClasses(targetInput)("valid")
                }     

                Handlers.handleMidpoint()
                break;
        }

        Handlers.handleGreekFormatting(targetInput, e)
    }

    static handleValidatorCompression = () => {

        const { textInput1, textInput2 } = Elems
        /**
         * 
         * @param {HTMLDivElement} elem 
         */
        const getValidationText = (elem) => {
            if (elem.classList.contains("valid")) {
                return "This ID is valid"
            } else {
                return "This ID is not valid"
            }
        }

        if (Validator.iSicilyDocID(textInput1.textContent) &&
                Validator.shortID(textInput1.textContent, base)) {
            Attrs.addClasses(textInput1)("valid")
        } else {
            Attrs.removeClasses(textInput2)("valid")
        }

        if (Validator.iSicilyDocID(textInput1.textContent) || 
            Validator.shortID(textInput1.textContent, base)) {
                Attrs.addClasses(textInput1)("valid")

        } else {
            Attrs.removeClasses(textInput1)("valid")
        }

        if (Validator.iSicilyElemID(textInput2.textContent, base)) {
            Attrs.addClasses(textInput2)("valid")             
        }  else {
            Attrs.removeClasses(textInput2)("valid")
        }

        textInput1.setAttribute("title", getValidationText(textInput1))
        textInput2.setAttribute("title", getValidationText(textInput2))
    }

    static hideAllPopups = () => {
        const {aboutBtn, notesBtn, aboutDiv, notesDiv} = Elems

        Attrs.deactivate(aboutBtn, notesBtn)
        Attrs.hide(aboutDiv, notesDiv)
    }

    /**
     * Set the inner HTML of the elements (either divs or spans)
     * to the empty string
     * @param {Array.<HTMLDivElement> | Array.<HTMLSpanElement>} divs 
     */
    static reset = (...divs) => {
        divs.forEach ( div => div.textContent = "" )
    }

    /**
     * Resets the text of the tooltips for the input elements
     */
    static resetInputs = () => {
        Handlers.resetStatusTips()
        Handlers.reset(Elems.textInput1, Elems.textInput2, Elems.result)
    }

    static resetStatusTips = () => {
        Elems.textInput1.setAttribute("title", "")
        Elems.textInput2.setAttribute("title", "")
    }
}

