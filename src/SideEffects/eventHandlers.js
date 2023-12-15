

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

    // textInput1.value = ""
    textInput2.value = ""

    switch (selectionMode()) {
        case "compression":
            result.textContent = BLANKCOMPRESSION;
            show(compressBtn, flipBtn)
            hide(textInput2, resolvedID1, midPointBtn)
            break;            
        case "midpoint":
            result.textContent = BLANKMIDPOINT
            show(textInput2, midPointBtn)
            hide(compressBtn, flipBtn)
            break;
    }

    show(textInputDiv)
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
                enable(compressBtn, midPointBtn, flipBtn);
                handleCompression();
            }
            else {
                removeClasses(targetInput)("valid")
                disable(compressBtn, midPointBtn, flipBtn);
                handleCompression();
            }            
            break;

        case "midpoint":
            if (validate(targetInput)) {
                addClasses(targetInput)("valid")
                enable(compressBtn, midPointBtn, flipBtn);
            }
            else {
                removeClasses(targetInput)("valid")
                disable(compressBtn, midPointBtn, flipBtn);
            }     

            if (validate(textInput1) && validate(textInput2)) {
                enable(midPointBtn)
                handleMidpoint()
            } else {
                disable(midPointBtn)
                result.textContent = `${REST}?${REST}`
            }
            break;
    }
}