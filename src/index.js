
const idToConvert = () => BigInt(inputIdElem1.value)

function addListeners() {
    compressBtn.addEventListener("click", handleCompression)
    midPointBtn.addEventListener("click", handleMidPoint)
    compressionRad.addEventListener("click", handleRadio)
    midpointRad.addEventListener("click", handleRadio)
    flipBtn.addEventListener("click", handleFlip)
    inputIdElem1.addEventListener("keyup", handleKeyUpEvent)
    inputIdElem2.addEventListener("keyup", handleKeyUpEvent)
}

addListeners()
handleRadio()