
/**
 * @returns {bigint}
 */
const idToConvert = () => BigInt(getInputIdElem1().value)

const compress = () => {
    document.getElementById("result").textContent = decToBase(idToConvert(), BASE100)
}

const decompress = () => {
    document.getElementById("result").textContent = insertISic(String(baseToDec(getInputIdElem1().value, BASE100)))
}

const getMidPoint = () => {
    document.getElementById("result").textContent = midPointBetweenValues(getInputIdElem1().value, getInputIdElem2().value, BASE100)
}