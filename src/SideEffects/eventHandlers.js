

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


const handleRadio = () => {

    hide(textInputDiv)

    switch (selectionMode()) {
        case "compression":
            handleCompression()
            show(flipBtn)
            hide(textInput2, resolvedID1)
            break;            
        case "midpoint":
            handleMidpoint()
            show(textInput2)
            hide(flipBtn)
            break;
    }

    show(textInputDiv)
}

/**
 * 
 * @param {MouseEvent} e 
 */
const handleToggle = (e) => {

    const target = /** @type {HTMLElement} */ (e.target)  

    switch (target.id) {
        case compressBtn.id:
            handleCompression()
            activate(compressBtn)
            deactivate(midPointBtn)
            hide(textInput2, resolvedID1)
            show(flipBtn)

            return

        case midPointBtn.id:
            handleMidpoint()
            activate(midPointBtn)
            deactivate(compressBtn)
            hide(flipBtn)
            show(textInput2)
            return

        default:
            return
        
    }
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