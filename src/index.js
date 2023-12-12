
const idToConvert = () => BigInt(inputIdElem1.value)

function addListeners() {
    compressBtn.addEventListener("click", handleCompress)
    decompressBtn.addEventListener("click", handleDecompress)
    midPointBtn.addEventListener("click", handleMidPoint)
}

addListeners()