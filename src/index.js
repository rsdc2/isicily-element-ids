
const idToConvert = () => BigInt(textInput1.value)

function addListeners() {
    compressBtn.addEventListener("click", handleCompression)
    midPointBtn.addEventListener("click", handleMidpoint)
    compressionRad.addEventListener("click", handleRadio)
    midpointRad.addEventListener("click", handleRadio)
    flipBtn.addEventListener("click", handleFlip)
    textInput1.addEventListener("input", handleChangeEvent)
    textInput2.addEventListener("input", handleChangeEvent)
}

addListeners()
handleRadio()