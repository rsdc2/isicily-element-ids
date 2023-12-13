
const idToConvert = () => BigInt(inputIdElem1.value)

function addListeners() {
    compressBtn.addEventListener("click", handleCompression)
    midPointBtn.addEventListener("click", handleMidPoint)
    compressionRad.addEventListener("click", handleRadio)
    midpointRad.addEventListener("click", handleRadio)
    flipBtn.addEventListener("click", handleFlip)
}

addListeners()
handleRadio()