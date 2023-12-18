
/**
 * 
 * @param {KeyboardEvent} ev 
 */
const handleChangeFocus = (ev) => {

    const target = /** @type {HTMLElement} */ (ev.target)

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
        span("#resolved-id-1").innerHTML = insertISic(String(baseToDec(textInput1.textContent, BASE100)))

    } else if (isDecimal(textInput1.textContent)) {
        Message.hide()
        textInput1.textContent = "ISic" + textInput1.textContent
        setCaretEnd(textInput1)
        handleCompression()

    } else if (validatePartialLongID(textInput1.textContent)) {
        Message.hide()
        result.textContent = "-"
        const inpt = textInput1.textContent + "-" + textInput2.textContent
        addClasses(result, textInput2)("five")
        show(result, textInput2)

        if (validateLongID(inpt)) {
            span("#resolved-id-1").innerHTML = formatGreek(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
        } else {
            span("#resolved-id-1").innerHTML = BLANKCOMPRESSION
        }
    } else {
        span("#resolved-id-1").innerHTML = BLANKCOMPRESSION
        hide(result, textInput2) 
        removeClasses(result, textInput2)("five")
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
            textInput2.textContent = ""
            hide(textInput2, result)
        } else

        if (validateLongID(resolved)) {
            const matches = resolved.matchAll(/(^ISic0[0-9]{5,5})-([0-9]{5,5})$/g).next()
            if (matches) {
                textInput1.textContent = matches.value[1]
                textInput2.textContent = matches.value[2]    
                show(textInput2, result)
            }
        }
                                    
        handleCompression()    
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


    const v1Dec = baseToDec(textInput1.textContent, BASE100)
    const v2Dec = baseToDec(textInput2.textContent, BASE100)
    
    let v1StatusMid = ""
    let v2StatusMid = ""
    let midpointValid = true
    
    if (validateShortID(textInput1.textContent)) {
        v1StatusMid = "This ID is valid"
        span("#resolved-id-1").textContent = insertISic(String(v1Dec))
    } else {
        v1StatusMid = "ERROR: This ID is not valid"
        midpointValid = false
        span("#resolved-id-1").textContent = ""
        Message.hide()
    }

    if (validateShortID(textInput2.textContent)) {
        v2StatusMid = "This ID is valid"
        span("#resolved-id-2").textContent = insertISic(String(v2Dec))
    } else {
        v2StatusMid = "ERROR: This ID is not valid"
        midpointValid = false
        span("#resolved-id-2").textContent = ""
        Message.hide()
    }

    if (v1Dec > v2Dec) {
        v1StatusMid = v1StatusMid.concat("\nERROR: This ID comes after the second ID")
        v2StatusMid = v2StatusMid.concat("\nERROR: This ID comes before the first ID")
        if (validate(textInput1) && validate(textInput2)) {
            Message.alert("First ID comes after second ID")
        }
        midpointValid = false
    }

    if (v1Dec === v2Dec) {
        v1StatusMid = v1StatusMid.concat("\nERROR: This ID is equal to the second ID")
        v2StatusMid = v2StatusMid.concat("\nERROR: This ID is equal to the first ID.")
        if (validate(textInput1) && validate(textInput2)) {
            Message.alert("IDs are equal")
        }
        midpointValid = false
    }

    if (v1Dec === v2Dec + 1n || v1Dec === v2Dec - 1n) {
        v1StatusMid = v1StatusMid.concat("\nERROR: There are no positions in between these IDs")
        v2StatusMid = v2StatusMid.concat("\nERROR: There are no positions in between these IDs")
        if (validate(textInput1) && validate(textInput2)) {
            Message.alert("No IDs between the two values")
        }
        midpointValid = false
    }

    textInput1.setAttribute("title", v1StatusMid)
    textInput2.setAttribute("title", v2StatusMid)
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
        
        span("#resolved-midpoint-id").textContent = insertISic(String(baseToDec(midpoint, BASE100)))

    } else {
        removeClasses(result)("valid")
        result.textContent = BLANKMIDPOINT
        span("#resolved-midpoint-id").textContent = ""
    }

}


const handleNotes = () => {
    switch (hasClass("activated")(button("#notes-btn"))) {
        case true:
            show(div(".notes"))
            break;
        case false:
            hide(div(".notes"))
            break;
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
            hide(textInput2, result, resolvedID2, span("#resolved-midpoint-id"))
            enable(flipBtn)

            removeClasses(textInput1, textInput2)("five")

            break

        case "midpoint":
            handleMidpoint()
            show(textInput2, result, resolvedID2, span("#resolved-midpoint-id"))
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
            textInput2.innerHTML = ""
            if (selectionMode() == "midpoint") {
                activate(compressBtn)
                deactivate(midPointBtn)
                textInput1.focus()
                setCaretEnd(textInput1)
                addClasses(result, textInput2)("five")
            }
            else {
                textInput1.textContent = ""
            }
            break;

        case midPointBtn.id:

            if (selectionMode() == "compression") {
                if (textInput1.textContent.match(/[0-9]/)) {
                    textInput1.textContent = ""
                    textInput2.textContent = ""
                }
                activate(midPointBtn)
                deactivate(compressBtn)    
                textInput1.focus()
                setCaretEnd(textInput1)
                removeClasses(result)("five")
            } 
            else {
                textInput1.textContent = ""
                textInput2.textContent = ""
            }
            break;

        case button("#notes-btn").id:
            toggle("activated")(button("#notes-btn"))
            handleNotes()
            break;

        default:
            break;
    }    

    handleSelection()

}


/**
 * Event may be either MouseEvent or InputEvent
 * @param {Event} e
 */

const handleUpdateInput = (e) => {

    const target = /** @type {HTMLElement} */ (e.target) 

    const targetInput = target.id === textInput1.id ? textInput1 : 
                                        target.id === textInput2.id ? textInput2 :
                                            null 
    if (targetInput === null) return;

    switch (selectionMode()) {
        case "compression":

            switch (targetInput.id) {
                case textInput1.id:
                    if (validateISicilyNumber(targetInput.textContent) || 
                        validateShortID(targetInput.textContent)) {

                        addClasses(targetInput)("valid")

                    } else {
                        removeClasses(targetInput)("valid")
                    }
                    break;

                case textInput2.id:
                    if (validateISicilyTokenNumber(targetInput.textContent)) {
                        addClasses(targetInput)("valid")             
                    }  else {
                        removeClasses(targetInput)("valid")
                    }
                    break;

                default:
                    removeClasses(targetInput, result)("valid")
                    handleCompression();
                    break;
            }

            handleCompression()

            if (validate(targetInput) && validate(resolvedID1)) {
                enable(flipBtn)
            } else {
                disable(flipBtn)
            }
            
            handleValidateCompression();
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

    textInput1.setAttribute("title", v1StatusComp)
}

