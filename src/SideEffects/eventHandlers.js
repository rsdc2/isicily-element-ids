import Bases from "../Pure/bases.js"
import Format from "../Pure/formatting.js"
import Select from "./selection.js"
import Validate from "../Pure/validate.js"
import Constants from "../Pure/constants.js"
import Err from "../Pure/errors.js"
import Elems from "../SideEffects/elements.js"
import Attrs from "./elementAttributes.js"
import Status from "./elementValues.js"
import Message from "./messageAlert.js"

const {
    ABOUTTEXT,
    
    BLANKCOMPRESSION,
    BLANKISIC,
    BLANKMIDPOINT,
    EQ,
    NOTESTEXT,
    REST,
    UPPERCASELATIN, 
    LOWERCASELATIN, 
    UPPERCASEGREEK, 
    LOWERCASEGREEK, 
    FIVEBLANKS,
    METAKEYS,

} = Constants

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

        if (targetInput === null) return;

        if (["keydown", "keypress", "keyup"].includes(e.type)) {
            const keyE = /** @type {KeyboardEvent} */ (e)
            
            if (METAKEYS.includes(keyE.key)) {
                return 
            }
            
            if (keyE.ctrlKey) {
                if (keyE.key === "v" || keyE.key === "ω") {
                    return Handlers.getTargetInputFromSplittingLongID(
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

        if (METAKEYS.includes(e.key) || (e.ctrlKey && e.key !== "v")) {
            return
        }

        const changeFocus = () => {Elems.textInput1.blur(); Elems.textInput2.focus()}

        switch (target.id) {
            case Elems.textInput1.id:
                if (Validate.validateISicilyNumber(Elems.textInput1.textContent) && Status.selectionMode() === "compression") changeFocus()
                if (Validate.validateShortID(Elems.textInput1.textContent) && Status.selectionMode() === "midpoint") changeFocus()

                break;
            case Elems.textInput2.id:
                if (Validate.validateISicilyTokenNumber(Elems.textInput2.textContent) && Status.selectionMode() === "compression") Elems.textInput2.blur()
                if (Validate.validateShortID(Elems.textInput2.textContent) && Status.selectionMode() === "midpoint") Elems.textInput2.blur()
        }
    }

    /**
     * 
     */
    static handleCompression = () => {
        const {
            resolvedID1, 
            resolvedID2
        } = Elems
    

        if (Validate.validateShortID(Elems.textInput1.textContent)) {
            Message.hide()
            Elems.resolvedID1.innerHTML = Format.insertISic(String(Bases.baseToDec(Elems.textInput1.textContent, Bases.BASE100)))
        } else if (Elems.textInput1.textContent.trim() === "") {
            Elems.resolvedID1.innerHTML = BLANKCOMPRESSION
            Attrs.hide(Elems.result, Elems.textInput2)
            Handlers.reset(Elems.textInput2, Elems.result)
            Attrs.removeClasses(Elems.result, Elems.textInput2)("five", "one")  
        } else if (Validate.containsOnlyLetters(Elems.textInput1.textContent)) {
            Elems.resolvedID1.innerHTML = BLANKISIC
            Attrs.hide(Elems.result, Elems.textInput2)
            Handlers.reset(Elems.textInput2, Elems.result)
            Attrs.removeClasses(Elems.result, Elems.textInput2)("five", "one")   
        } else if (Validate.isDecimal(Elems.textInput1.textContent)) {
            Message.hide()
            Elems.textInput1.textContent = "ISic" + Elems.textInput1.textContent
            Select.setCaretEnd(Elems.textInput1)
            Handlers.handleCompression()

        } else if (Validate.validatePartialLongID(Elems.textInput1.textContent)) {
            Message.hide()
            Elems.result.textContent = "-"
            const inpt = Elems.textInput1.textContent + "-" + Elems.textInput2.textContent
            Attrs.addClasses(Elems.textInput2)("five")
            Attrs.addClasses(Elems.result)("valid", "one")
            Attrs.show(Elems.result, Elems.textInput2)

            if (Validate.validateLongID(inpt)) {
                resolvedID1.innerHTML = Format.formatGreek(Format.padShortID(Bases.BASE100, Bases.decToBase(BigInt(Format.removeISic(inpt)), Bases.BASE100)))
            } else {
                resolvedID1.innerHTML = FIVEBLANKS
            }
    
    
        } else {
            resolvedID1.innerHTML = BLANKCOMPRESSION
            Attrs.hide(Elems.result, Elems.textInput2)
            Handlers.reset(Elems.textInput2, Elems.result)
            Attrs.removeClasses(Elems.result, Elems.textInput2)("five", "one")
        }
    }


    /**
     * Makes sure that the Flip button is disabled / enabled appropriately
     */
    static handleCheckFlip = () => {
        const { flipBtn, resolvedID1 } = Elems

        if ((Validate.validate(Elems.textInput1) || 
        Validate.validateLongID(Elems.textInput1.textContent + "-" + Elems.textInput2.textContent)) && Validate.validate(resolvedID1)) {

            Attrs.enable(flipBtn)
        } else {
            Attrs.disable(flipBtn)
        }
    }


    /**
     * 
     */
    static handleFlip = () => {
        const { resolvedID1 } = Elems

        if (Status.selectionMode() === "compression") {
            const resolved = resolvedID1
                .textContent
                .replace(`${EQ}`, "")
                .replace("?", "")

            if (Validate.validateShortID(resolved)) {
                Elems.textInput1.textContent = resolved
                Handlers.reset(Elems.textInput2, Elems.result)
                Attrs.hide(Elems.textInput2, Elems.result)
            } else

            if (Validate.validateLongID(resolved)) {
                Handlers.getTargetInputFromSplittingLongID(Elems.textInput1, resolved)
            }
                                        
            Handlers.handleCompression()    
            Handlers.handleValidateCompression()
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
        Elems.result.innerHTML = Format.formatGreek(Elems.result.textContent)

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

    static  handleHover = () => {
        switch (Status.selectionMode()) {
            case "compression":
                Handlers.handleValidateCompression()
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

        const text1 = textInput1.textContent
        const text2 = textInput2.textContent

        const text1Dec = Bases.baseToDec(text1, Bases.BASE100)
        const text2Dec = Bases.baseToDec(text2, Bases.BASE100)
        
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
            if (Validate.validate(Elems.textInput1) && Validate.validate(Elems.textInput2)) {
                Message.alert("First ID comes after second ID")
            }
            midpointValid = false
        }

        if (text1Dec === text2Dec) {
            text1Status = text1Status.concat("\nERROR: This ID is equal to the second ID")
            text2Status = text2Status.concat("\nERROR: This ID is equal to the first ID.")
            if (Validate.validate(Elems.textInput1) && Validate.validate(Elems.textInput2)) {
                Message.alert("IDs are equal")
            }
            midpointValid = false
        }

        if (text1Dec === text2Dec + 1n || text1Dec === text2Dec - 1n) {
            text1Status = text1Status.concat("\nERROR: There are no positions in between these IDs")
            text2Status = text2Status.concat("\nERROR: There are no positions in between these IDs")
            if (Validate.validate(Elems.textInput1) && Validate.validate(Elems.textInput2)) {
                Message.alert("No IDs between the two values")
            }
            midpointValid = false
        }

        Elems.textInput1.setAttribute("title", text1Status)
        Elems.textInput2.setAttribute("title", text2Status)

        if (midpointValid) {
            Attrs.addClasses(Elems.result)("valid")

            const midpoint = Bases.midPointBetweenValues(
                Elems.textInput1.textContent, 
                Elems.textInput2.textContent, 
                Bases.BASE100
            )
            Elems.result.innerHTML = 
                `${REST}`.concat(Format.formatGreek(midpoint), `${REST}`
                )
            
            resolvedMidpointID.textContent = Format.insertISic(String(Bases.baseToDec(midpoint, Bases.BASE100)))

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
                    Handlers.handleValidateCompression()
                }
                else {
                    Handlers.resetInputs()
                }
                break;

            case Elems.midPointBtn.id:

                if (Status.selectionMode() == "compression") {
                    if (Validate.containsNumerals(Elems.textInput1.textContent)) {
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
            Elems.aboutDiv.innerHTML = ABOUTTEXT
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
            Elems.notesDiv.innerHTML = NOTESTEXT
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
                Handlers.handleValidateCompression()
                Handlers.handleCheckFlip()
                break;

            case "midpoint":
                if (Validate.validateShortID(targetInput.textContent)) {
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

    static handleValidateCompression = () => {
        let v1StatusComp = ""

        if (Validate.validate(Elems.textInput1)) {
            v1StatusComp = "This ID is valid"
        } else {
            v1StatusComp = "This ID is not valid"
        }

        if (Validate.validateISicilyNumber(Elems.textInput1.textContent) || 
            Validate.validateShortID(Elems.textInput1.textContent)) {

            Attrs.addClasses(Elems.textInput1)("valid")

        } else {
            Attrs.removeClasses(Elems.textInput1)("valid")
        }

        if (Validate.validateISicilyTokenNumber(Elems.textInput2.textContent)) {
            Attrs.addClasses(Elems.textInput2)("valid")             
        }  else {
            Attrs.removeClasses(Elems.textInput2)("valid")
        }

        Elems.textInput1.setAttribute("title", v1StatusComp)
    }

    static hideAllPopups = () => {
        const {aboutBtn, notesBtn, aboutDiv, notesDiv} = Elems

        Attrs.deactivate(aboutBtn, notesBtn)
        Attrs.hide(aboutDiv, notesDiv)
    }

    /**
     * 
     * @param {Array.<HTMLDivElement> | Array.<HTMLSpanElement>} divs 
     */
    static reset = (...divs) => {

        divs.forEach ( div => div.innerHTML = "" )
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

