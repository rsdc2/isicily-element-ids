/**
 * Returns target input from an event:
 * ignores meta keys
 * @param {KeyboardEvent | MouseEvent | InputEvent} e 
 * @returns {HTMLDivElement | null}
 */
const getTargetInput = (e) => {
    const target = /** @type {HTMLElement} */ (e.target) 

    let targetInput = target.id === textInput1.id ? textInput1 : 
                                        target.id === textInput2.id ? textInput2 :
                                            null 

    if (targetInput === null) return;

    if (["keydown", "keypress", "keyup"].includes(e.type)) {
        const keyE = /** @type {KeyboardEvent} */ (e)
        
        if (METAKEYS.includes(keyE.key)) {
            return
        }

        if (keyE.ctrlKey && keyE.key === "v") {
            return getTargetInputFromSplittingLongID(targetInput, targetInput.textContent)
        } else if (keyE.ctrlKey) {
            return
        }
    }

    return targetInput

}

/**
 * Displays a long ID appropriately in the two textboxes; 
 * returns the Div that should receive the focus;
 * NB: this has side effects
 * @param {HTMLDivElement} defaultElem
 * @param {string} longID with document ID and token ID 
 * @returns {HTMLDivElement} new target element
 */
const getTargetInputFromSplittingLongID = (defaultElem, longID) => {
    const matches = longID.matchAll(/(^ISic0[0-9]{5,5})-([0-9]{0,5})$/g).next()
    if (matches.value) {
        textInput1.textContent = matches.value[1]
        textInput2.textContent = matches.value[2]    
        show(textInput2, result)
        return textInput2
    }

    hide(result, textInput2)
    reset(result, textInput2)
    return defaultElem
}



/**
 * 
 * @param {KeyboardEvent} e 
 */
const handleChangeFocus = (e) => {

    const target = /** @type {HTMLElement} */ (e.target)

    if (METAKEYS.includes(e.key) || (e.ctrlKey && e.key !== "v")) {
        console.log("Cancel change focus")
        return
    }

    const changeFocus = () => {textInput1.blur(); textInput2.focus()}

    switch (target.id) {
        case textInput1.id:
            if (validateISicilyNumber(textInput1.textContent) && selectionMode() === "compression") changeFocus()
            if (validateShortID(textInput1.textContent) && selectionMode() === "midpoint") changeFocus()

            break;
        case textInput2.id:
            if (validateISicilyTokenNumber(textInput2.textContent) && selectionMode() === "compression") textInput2.blur()
            if (validateShortID(textInput2.textContent) && selectionMode() === "midpoint") textInput2.blur()
    }
}

/**
 * 
 */
const handleCompression = () => {

    if (validateShortID(textInput1.textContent)) {
        Message.hide()
        resolvedID1.innerHTML = insertISic(String(baseToDec(textInput1.textContent, BASE100)))

    } else if (isDecimal(textInput1.textContent)) {
        Message.hide()
        textInput1.textContent = "ISic" + textInput1.textContent
        setCaretEnd(textInput1)
        handleCompression()

    } else if (validatePartialLongID(textInput1.textContent)) {
        Message.hide()
        result.textContent = "-"
        const inpt = textInput1.textContent + "-" + textInput2.textContent
        addClasses(textInput2)("five")
        addClasses(result)("valid", "one")
        show(result, textInput2)

        if (validateLongID(inpt)) {
            resolvedID1.innerHTML = formatGreek(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
        } else {
            resolvedID1.innerHTML = BLANKCOMPRESSION
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
    if ((validate(textInput1) || 
        validateLongID(textInput1.textContent + "-" + textInput2.textContent)) && validate(resolvedID1)) {

        enable(flipBtn)
    } else {
        disable(flipBtn)
    }
}

/**
 * 
 */
const handleFlip = () => {
    if (selectionMode() === "compression") {
        const resolved = resolvedID1
            .textContent
            .replace(`${EQ}`, "")
            .replace("?", "")

        if (validateShortID(resolved)) {
            textInput1.textContent = resolved
            reset(textInput2, result)
            hide(textInput2, result)
        } else

        if (validateLongID(resolved)) {
            getTargetInputFromSplittingLongID(textInput1, resolved)
        }
                                    
        handleCompression()    
        handleValidateCompression()
    }
}


const handleHover = () => {
    switch (selectionMode()) {
        case "compression":
            handleValidateCompression()
            break;

        case "midpoint":
            handleMidpoint()
            break;
    }
}


const handleMidpoint = () => {
    const text1 = textInput1.textContent
    const text2 = textInput2.textContent

    const text1Dec = baseToDec(text1, BASE100)
    const text2Dec = baseToDec(text2, BASE100)
    
    let midpointValid = true
    
    let [textInput1Err, text1Status] = getShortIDValidationIndividual(text1)
    let [textInput2Err, text2Status] = getShortIDValidationIndividual(text2)
    if (textInput1Err) resolvedID1.textContent = insertISic(String(text1Dec))
    if (textInput2Err) resolvedID1.textContent = insertISic(String(text2Dec))

    if (textInput1Err === ERR.ISVALID) {
        resolvedID1.textContent = insertISic(String(text1Dec))
        Message.hide()
    } else {
        resolvedID1.textContent = BLANKISIC
        resolvedMidpointID.textContent = BLANKISIC
        midpointValid = false

        if (textInput1Err === ERR.CONTAINSNUMERAL) {
            Message.alert(containsNumeralErr("1"))
        }
    }

    if (textInput2Err === ERR.ISVALID) {
        resolvedID2.textContent = insertISic(String(text2Dec))
        Message.hide()
    } else {
        resolvedID2.textContent = BLANKISIC
        resolvedMidpointID.textContent = BLANKISIC
        midpointValid = false
    }

    if (textInput1Err === ERR.CONTAINSNUMERAL || textInput2Err === ERR.CONTAINSNUMERAL) {
        Message.alert(containsNumeralErr(""))
        midpointValid = false
    }

    if (textInput1Err === ERR.CONTAINSSPECIAL || textInput2Err === ERR.CONTAINSSPECIAL) {
        Message.alert(containsSpecialErr(""))
        midpointValid = false
    }

    if (isGenericErr(textInput1Err, textInput2Err)) {
        Message.hide()
    }

    if (text1Dec > text2Dec) {
        text1Status = text1Status.concat("\nThis ID comes after the second ID")
        text2Status = text2Status.concat("\nThis ID comes before the first ID")
        if (validate(textInput1) && validate(textInput2)) {
            Message.alert("First ID comes after second ID")
        }
        midpointValid = false
    }

    if (text1Dec === text2Dec) {
        text1Status = text1Status.concat("\nERROR: This ID is equal to the second ID")
        text2Status = text2Status.concat("\nERROR: This ID is equal to the first ID.")
        if (validate(textInput1) && validate(textInput2)) {
            Message.alert("IDs are equal")
        }
        midpointValid = false
    }

    if (text1Dec === text2Dec + 1n || text1Dec === text2Dec - 1n) {
        text1Status = text1Status.concat("\nERROR: There are no positions in between these IDs")
        text2Status = text2Status.concat("\nERROR: There are no positions in between these IDs")
        if (validate(textInput1) && validate(textInput2)) {
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
            `${REST}`.concat(formatGreek(midpoint), `${REST}`
            )
        
        resolvedMidpointID.textContent = insertISic(String(baseToDec(midpoint, BASE100)))

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

const handleSelection = () => {
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
const handleToggleMode = (e) => {

    const target = /** @type {HTMLElement} */ (e.target)  

    switch (target.id) {
        case compressBtn.id:
            reset(textInput2, result)
            
            if (selectionMode() == "midpoint") {
                activate(compressBtn)
                deactivate(midPointBtn)
                textInput1.focus()
                setCaretEnd(textInput1)
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
                if (containsNumerals(textInput1.textContent)) {
                    resetInputs()
                }
                activate(midPointBtn)
                deactivate(compressBtn)    
                textInput1.focus()
                setCaretEnd(textInput1)
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

    handleSelection()

}

/**
 * 
 * @param {Event} e 
 */
const handleToggleShowAbout = (e) => {
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
const handleToggleShowNotes = (e) => {
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

const handleUpdateInput = (e) => {

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
            if (validateShortID(targetInput.textContent)) {
                addClasses(targetInput)("valid")
            }
            else {
                removeClasses(targetInput)("valid")
            }     

            handleMidpoint()
            break;
    }

    targetInput.innerHTML = formatGreek(targetInput.textContent)
    setCaretEnd(targetInput)
    result.innerHTML = formatGreek(result.textContent)
}

const handleValidateCompression = () => {
    let v1StatusComp = ""

    if (validate(textInput1)) {
        v1StatusComp = "This ID is valid"
    } else {
        v1StatusComp = "This ID is not valid"
    }

    if (validateISicilyNumber(textInput1.textContent) || 
        validateShortID(textInput1.textContent)) {

        addClasses(textInput1)("valid")

    } else {
        removeClasses(textInput1)("valid")
    }

    if (validateISicilyTokenNumber(textInput2.textContent)) {
        addClasses(textInput2)("valid")             
    }  else {
        removeClasses(textInput2)("valid")
    }

    textInput1.setAttribute("title", v1StatusComp)
}

const hideAllPopups = () => {
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