function addListeners() {
    compressBtn.addEventListener("click", handleToggle)
    midPointBtn.addEventListener("click", handleToggle)
    flipBtn.addEventListener("click", handleFlip)
    textInput1.addEventListener("input", handleUpdateInput)
    textInput2.addEventListener("input", handleUpdateInput)
    textInput1.addEventListener("click", handleUpdateInput)
    textInput2.addEventListener("click", handleUpdateInput)
    // textInput1.addEventListener("mouseover", handleHover)
    // textInput2.addEventListener("mouseover", handleHover)

}