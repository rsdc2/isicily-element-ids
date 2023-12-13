/**
 * 
 * @param {MouseEvent} ev 
 */

const handleCompress = (ev) => {
    result.textContent = 
        decToBase(idToConvert(), BASE100)
}

/**
 * 
 * @param {MouseEvent} ev 
 */
const handleDecompress = (ev) => {
    result.textContent = 
        insertISic(String(baseToDec(inputIdElem1.value, BASE100)))
}

/**
 * 
 * @param {MouseEvent} ev 
 */
const handleCompression = (ev) => {
    const inpt = inputIdElem1.value

    const validateLong = STRICT ? validateLongID : isDecimal
    const validateShort = STRICT ? validateShortID : identity

    if (validateLong(removeISic(inpt))) {
        result.textContent = decToBase(BigInt(removeISic(inpt)), BASE100)
    } else if (validateShort(inpt)) {
        result.textContent = insertISic(String(baseToDec(inpt, BASE100)))
    } else {
        result.textContent = "Invalid compressed or uncompressed ID"
    }
}

/**
 * 
 * @param {MouseEvent} ev 
 */
const handleMidPoint = (ev) => {
    result.textContent = 
        midPointBetweenValues(
            inputIdElem1.value, 
            inputIdElem2.value, 
            BASE100
        )
}


const handleRadio = () => {
    const sel = 
        /** @type {string} */
        operationForm.elements['operation'].value

    textInputDiv.hidden = true

    switch (sel) {
        case "compression":
            inputIdElem2.hidden = true
            midPointBtn.hidden = true

            compressBtn.hidden = false
            break;            
        case "midpoint":
            inputIdElem2.hidden = false
            midPointBtn.hidden = false

            compressBtn.hidden = true
            break;
    }

    textInputDiv.hidden = false
}
