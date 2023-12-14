/**
 * 
 * @param {string} x 
 * @returns {boolean}
 */


const validateLongID = STRICT ? validateLongIDStrict : validateLongIdNonStrict
const validateShortID = STRICT ? validateShortIDStrict : validateShortIdNonStrict

/**
 * 
 */
const handleCompression = () => {
    const inpt = inputIdElem1.value

    if (validateLongID(inpt)) {
        result.innerHTML = "= ".concat(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
    } else if (validateShortID(inpt)) {
        result.innerHTML = "= ".concat(insertISic(String(baseToDec(inpt, BASE100))))
    } else {
        alert("Invalid compressed or uncompressed ID")
    }
}


/**
 * 
 * @param {MouseEvent} ev 
 */
const handleFlip = (ev) => {
    const inpt = inputIdElem1.value
    const res = result.textContent

    inputIdElem1.value = res.replace("= ", "").replace("?", "")
    handleCompression()
}

/**
 * 
 * @param {MouseEvent} ev 
 */
const handleMidPoint = (ev) => {

    const v1 = inputIdElem1.value
    const v2 = inputIdElem2.value

    if (!validateShortID(v1)) {
        alert('First ID is not valid')
        return
    }

    if (!validateShortID(v2)) {
        alert("Second ID is not valid")
        return
    }

    result.textContent = 
        "... ".concat(
            midPointBetweenValues(
                v1, 
                v2, 
                BASE100
            ), " ..."
        )
}


const handleRadio = () => {
    const sel = 
        /** @type {string} */
        operationForm.elements['operation'].value

    textInputDiv.hidden = true


    inputIdElem1.value = ""
    inputIdElem2.value = ""


    switch (sel) {
        case "compression":
            inputIdElem2.hidden = true
            midPointBtn.hidden = true
            result.textContent = "= ?"

            compressBtn.hidden = false
            flipBtn.hidden = false
            break;            
        case "midpoint":
            inputIdElem2.hidden = false
            midPointBtn.hidden = false
            result.textContent = "... ? ..."

            compressBtn.hidden = true
            flipBtn.hidden = true
            break;
    }

    textInputDiv.hidden = false
}
