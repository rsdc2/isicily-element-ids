    
/**
 * @returns {bigint}
 */
const idToConvert = () => BigInt(inputIdElem1().value)

/**
 * 
 * @param {MouseEvent} ev 
 */

const handleCompress = (ev) => {
    document.getElementById("result").textContent = decToBase(idToConvert(), BASE100)
}

/**
 * 
 * @param {MouseEvent} ev 
 */
const handleDecompress = (ev) => {
    document.getElementById("result").textContent = insertISic(String(baseToDec(inputIdElem1().value, BASE100)))
}

/**
 * 
 * @param {MouseEvent} ev 
 */
const handleMidPoint = (ev) => {
    document.getElementById("result").textContent = midPointBetweenValues(inputIdElem1().value, inputIdElem2().value, BASE100)
}

function addListeners() {
    compressBtn().addEventListener("click", handleCompress)
    decompressBtn().addEventListener("click", handleDecompress)
    midPointBtn().addEventListener("click", handleMidPoint)
}

addListeners()