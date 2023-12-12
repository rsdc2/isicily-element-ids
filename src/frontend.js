/**
 * Return the text input element
 * @returns {HTMLInputElement}
 */
const inputIdElem1 = () => {
    return /** @type {HTMLInputElement} */ (document.getElementById("text-input1"))
}

const inputIdElem2 = () => {
    return /** @type {HTMLInputElement} */ (document.getElementById("text-input2"))
}

const compressBtn = () => /** @type {HTMLButtonElement} */ (document.getElementById("compress-btn"))
const decompressBtn = () => /** @type {HTMLButtonElement} */ (document.getElementById("decompress-btn"))
const midPointBtn = () => /** @type {HTMLButtonElement} */ (document.getElementById("midpoint-btn"))