/**
 * 
 * @param {string} x 
 * @returns {boolean}
 */


/**
 * 
 */
const handleCompression = () => {
    const inpt = textInput1.value

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
    textInput1.value = res.replace(`${EQ}`, "").replace("?", "")
    handleCompression()
}

/**
 * 
 * @param {InputEvent} ev 
 */
const handleChangeEvent = (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target) 

    const targetInput = target.id === textInput1.id ? textInput1 : 
                                        target.id === textInput2.id ? textInput2 :
                                            null 

    if (targetInput === null) return;


    switch (selectionMode()) {
        case "compression":

            if (validate(targetInput)) {
                targetInput.classList.add("valid");
                enable(compressBtn, midPointBtn, flipBtn);
                handleCompression();
            }
            else {
                targetInput.classList.remove("valid");
                disable(compressBtn, midPointBtn, flipBtn);
                handleCompression();
            }            
            break;

        case "midpoint":
            if (validate(targetInput)) {
                targetInput.classList.add("valid");
                enable(compressBtn, midPointBtn, flipBtn);
            }
            else {
                targetInput.classList.remove("valid");
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

    textInput1.value = ""
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
