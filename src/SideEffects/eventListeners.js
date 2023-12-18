function addListeners() {
    button("#notes-btn").addEventListener("click", handleToggleMode)
    compressBtn.addEventListener("click", handleToggleMode)
    midPointBtn.addEventListener("click", handleToggleMode)
    flipBtn.addEventListener("click", handleFlip)
    textInput1.addEventListener("input", handleUpdateInput)
    textInput2.addEventListener("input", handleUpdateInput)
    textInput1.addEventListener("mouseover", handleUpdateInput)
    textInput2.addEventListener("mouseover", handleUpdateInput)
    resolvedID1.addEventListener("click", handleFlip)
}