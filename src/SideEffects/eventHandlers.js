

/**
 * 
 */
const handleCompression = () => {
    const inpt = textInput1.textContent

    if (validateLongID(inpt)) {
        Message.hide()
        span("#resolved-id-1").innerHTML = formatGreek(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
    } else if (validateShortID(inpt)) {
        Message.hide()
        span("#resolved-id-1").innerHTML = insertISic(String(baseToDec(inpt, BASE100)))
    } else {
        span("#resolved-id-1").innerHTML = BLANKCOMPRESSION
    }
}

/**
 * 
 */
const handleFlip = () => {
    if (selectionMode() === "compression") {
        const res = resolvedID1.textContent
        textInput1.textContent = res.replace(`${EQ}`, "")
                                .replace("?", "")
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
    
    if (validate(textInput1)) {
        v1StatusMid = "This ID is valid"
        span("#resolved-id-1").textContent = insertISic(String(v1Dec))
    } else {
        v1StatusMid = "ERROR: This ID is not valid"
        midpointValid = false
        span("#resolved-id-1").textContent = ""
        Message.hide()
    }

    if (validate(textInput2)) {
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
            addClasses(textInput1, textInput2)("sixteen")

            break

        case "midpoint":
            handleMidpoint()
            show(textInput2, result, resolvedID2, span("#resolved-midpoint-id"))
            disable(flipBtn)
            removeClasses(textInput1, textInput2)("sixteen")
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

            if (validate(targetInput)) {
                addClasses(targetInput, result)("valid")

                handleCompression();
            }
            else {
                removeClasses(targetInput, result)("valid")
                handleCompression();
                if (validateShortIdNonStrict(targetInput.textContent)) {
                    targetInput.setAttribute("maxlength", "5")
                } else {
                    targetInput.setAttribute("maxlength", "16")
                }
            }     

            if (validate(targetInput) && validate(resolvedID1)) {
                enable(flipBtn)
            } else {
                disable(flipBtn)
            }
            
            handleValidateCompression();
            break;

        case "midpoint":
            if (validate(targetInput)) {
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

