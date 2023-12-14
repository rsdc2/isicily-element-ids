/**
 * 
 * @param {string} x 
 * @returns {boolean}
 */


/**
 * 
 */
const handleCompression = () => {
    const inpt = inputIdElem1.value

    if (validateLongID(inpt)) {
        result.innerHTML = `${EQ}`.concat(padShortID(BASE100, decToBase(BigInt(removeISic(inpt)), BASE100)))
    } else if (validateShortID(inpt)) {
        result.innerHTML = `${EQ}`.concat(insertISic(String(baseToDec(inpt, BASE100))))
    }
}


/**
 * 
 * @param {MouseEvent} ev 
 */
const handleFlip = (ev) => {
    const res = result.textContent
    inputIdElem1.value = res.replace(`${EQ}`, "").replace("?", "")
    handleCompression()
}

/**
 * 
 * @param {InputEvent} ev 
 */
const handleChangeEvent = (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target) 

    const targetInput = target.id === inputIdElem1.id ? inputIdElem1 : 
                                        target.id === inputIdElem2.id ? inputIdElem2 :
                                            null 

    if (targetInput === null) return;

    switch (selectionMode()) {
        case "compression":
            if (validate(targetInput)) {
                targetInput.classList.add("valid")
                enable(compressBtn, midPointBtn, flipBtn)
                handleCompression()
            }
            else {
                targetInput.classList.remove("valid")
                disable(compressBtn, midPointBtn, flipBtn)
                handleCompression()
            }
        
        case "midpoint":
            
    }

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

    inputIdElem1.value = ""
    inputIdElem2.value = ""

    switch (selectionMode()) {
        case "compression":
            result.textContent = BLANKCOMPRESSION;
            show(compressBtn, flipBtn)
            hide(inputIdElem2, resolvedID1, midPointBtn)
            break;            
        case "midpoint":
            result.textContent = BLANKMIDPOINT
            show(inputIdElem2, midPointBtn)
            hide(compressBtn, flipBtn)
            break;
    }

    show(textInputDiv)
}

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const disable = (...elems) => elems.forEach( elem => elem.disabled = true )

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const enable = (...elems) => elems.forEach( elem => elem.disabled = false )

/**
 * @param {Array.<HTMLElement>} elems
 */
const hide = (...elems) => elems.forEach( elem => elem.hidden = true )

/**
 * @param {Array.<HTMLElement>} elems
 */
const show = (...elems) => elems.forEach( elem => elem.hidden = false )
