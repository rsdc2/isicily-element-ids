

/**
 * 
 */
const handleCompression = () => {
    const inpt = textInput1.value

    if (validateLongID(inpt)) {
        Message.hide()
        result.innerHTML = `${EQ}`.concat(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
    } else if (validateShortID(inpt)) {
        Message.hide()
        result.innerHTML = `${EQ}`.concat(insertISic(String(baseToDec(inpt, BASE100))))
    } else {
        Message.alert("Error: Invalid compressed or uncompressed ID")
        result.innerHTML = BLANKCOMPRESSION
    }
}

/**
 * 
 * @param {MouseEvent} e 
 */
const handleFlip = (e) => {
    const res = result.textContent
    textInput1.value = res.replace(`${EQ}`, "")
                            .replace("?", "")
    handleCompression()
}


const handleHover = () => {
    const v1Dec = baseToDec(textInput1.value, BASE100)
    const v2Dec = baseToDec(textInput2.value, BASE100)

    switch (selectionMode()) {
        case "compression":
            let v1StatusComp = ""

            if (validate(textInput1)) {
                v1StatusComp = "This ID is valid"
            } else {
                v1StatusComp = "This ID is not valid"
            }

            textInput1.setAttribute("title", v1StatusComp)
            break;

        case "midpoint":
            let v1StatusMid = ""
            let v2StatusMid = ""
            if (validate(textInput1)) {
                v1StatusMid = "This ID is valid"
            } else {
                v1StatusMid = "ERROR: This ID is not valid"
            }

            if (validate(textInput2)) {
                v2StatusMid = "This ID is valid"
            } else {
                v2StatusMid = "ERROR: This ID is not valid"
            }

            if (v1Dec > v2Dec) {
                v1StatusMid = v1StatusMid.concat("\nERROR: This ID comes after the second ID")
                v2StatusMid = v2StatusMid.concat("\nERROR: This ID comes before the first ID")

            }
        
            if (v1Dec === v2Dec) {
                v1StatusMid = v1StatusMid.concat("\nERROR: This ID is equal to the second ID")
                v2StatusMid = v2StatusMid.concat("\nERROR: This ID is equal to the first ID.")
            }
        
            if (v1Dec === v2Dec + 1n || v1Dec === v2Dec - 1n) {
                v1StatusMid = v1StatusMid.concat("\nERROR: There are no positions in between these IDs")
                v2StatusMid = v2StatusMid.concat("\nERROR: There are no positions in between these IDs")
            }

            textInput1.setAttribute("title", v1StatusMid)
            textInput2.setAttribute("title", v2StatusMid)
                        
    }

}

/**
 * 
 */
const handleMidpoint = () => {

    const v1 = textInput1.value
    const v2 = textInput2.value

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

    switch (selectionMode()) {
        case "compression":
            handleCompression()
            hide(textInput2, resolvedID1)
            show(flipBtn)

            return

        case "midpoint":
            handleMidpoint()
            hide(flipBtn)
            show(textInput2)
            return

        default:
            return

    }
}


/**
 * 
 * @param {MouseEvent} e 
 */
const handleToggle = (e) => {

    const target = /** @type {HTMLElement} */ (e.target)  

    switch (target.id) {
        case compressBtn.id:
            activate(compressBtn)
            deactivate(midPointBtn)

            break;

        case midPointBtn.id:
            activate(midPointBtn)
            deactivate(compressBtn)
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
                addClasses(targetInput)("valid")
                enable(flipBtn);
                handleCompression();
            }
            else {
                removeClasses(targetInput)("valid")
                disable(flipBtn);
                handleCompression();
            }            
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
            break;
    }
}