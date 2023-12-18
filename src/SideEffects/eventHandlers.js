/**
 * @param {MouseEvent} e
 */
const handleBtnMousedown = (e) => {
    const target = /** @type {HTMLElement} */ (e.target) 

}


/**
 * @param {MouseEvent} e
 */
const handleBtnMouseup = (e) => {
    const target = /** @type {HTMLElement} */ (e.target) 

}


/**
 * 
 */
const handleCompression = () => {
    const inpt = textInput1.textContent

    if (validateLongID(inpt)) {
        Message.hide()
        result.innerHTML = `${EQ}`.concat(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
    } else if (validateShortID(inpt)) {
        Message.hide()
        result.innerHTML = `${EQ}`.concat(insertISic(String(baseToDec(inpt, BASE100))))
    } else {
        result.innerHTML = BLANKCOMPRESSION
    }
}

/**
 * 
 * @param {MouseEvent} e 
 */
const handleFlip = (e) => {
    const res = result.textContent
    textInput1.textContent = res.replace(`${EQ}`, "")
                            .replace("?", "")
    handleCompression()
}


const handleHover = () => {
    switch (selectionMode()) {
        case "compression":
            handleValidateCompression()
            break;

        case "midpoint":
            handleValidateMidpoint()
            break;
    }

}

/**
 * 
 */
const handleMidpoint = () => {

    const v1 = textInput1.textContent
    const v2 = textInput2.textContent

    result.textContent = 
        `${REST}`.concat(
            midPointBetweenValues(
                v1, 
                v2, 
                BASE100
            ), `${REST}`
        )

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
            hide(textInput2, resolvedID1)
            enable(flipBtn)

            removeClasses(textInput1, textInput2)("five")
            addClasses(textInput1, textInput2)("sixteen")

            break

        case "midpoint":
            handleMidpoint()
            show(textInput2)
            disable(flipBtn)
            removeClasses(textInput1, textInput2)("sixteen")
            addClasses(textInput1, textInput2)("five")
            break

    }

    show(div(".input"))
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
            break;

        case midPointBtn.id:

            if (selectionMode() == "compression") {
                console.log("Change mode")
                if (textInput1.textContent.match(/[0-9]/)) {
                    textInput1.textContent = ""
                    textInput2.textContent = ""
                }
                activate(midPointBtn)
                deactivate(compressBtn)    
                textInput1.focus()
                setCaretEnd(textInput1)
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
                enable(flipBtn);

                handleCompression();
            }
            else {
                removeClasses(targetInput, result)("valid")
                disable(flipBtn);
                handleCompression();
                if (validateShortIdNonStrict(targetInput.textContent)) {
                    targetInput.setAttribute("maxlength", "5")
                } else {
                    targetInput.setAttribute("maxlength", "16")
                }
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

            if (validate(textInput1) && validate(textInput2)) {
                handleMidpoint()
            } else {
                result.textContent = BLANKMIDPOINT
            }

            handleValidateMidpoint()
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

const handleValidateMidpoint = () => {
    const v1Dec = baseToDec(textInput1.textContent, BASE100)
    const v2Dec = baseToDec(textInput2.textContent, BASE100)
    
    let v1StatusMid = ""
    let v2StatusMid = ""
    let midpointValid = true
    
    if (validate(textInput1)) {
        v1StatusMid = "This ID is valid"
    } else {
        v1StatusMid = "ERROR: This ID is not valid"
        midpointValid = false
        Message.hide()
    }

    if (validate(textInput2)) {
        v2StatusMid = "This ID is valid"
    } else {
        v2StatusMid = "ERROR: This ID is not valid"
        midpointValid = false
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
    } else {
        removeClasses(result)("valid")
    }

}