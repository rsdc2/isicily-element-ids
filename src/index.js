
const idToConvert = () => BigInt(inputIdElem1.value)

function addListeners() {
    compressBtn.addEventListener("click", handleCompress)
    decompressBtn.addEventListener("click", handleDecompress)
    midPointBtn.addEventListener("click", handleMidPoint)
    compressionRad.addEventListener("click", handleRadio)
    midpointRad.addEventListener("click", handleRadio)
}

addListeners()
