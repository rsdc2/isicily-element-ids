function addListeners() {
    compressBtn.addEventListener("click", handleToggleMode)
    midPointBtn.addEventListener("click", handleToggleMode)
    flipBtn.addEventListener("click", handleFlip)
    notesBtn.addEventListener("click", handleToggleShowNotes)
    notesDiv.addEventListener("click", handleToggleShowNotes)
    textInput1.addEventListener("input", handleUpdateInput)
    textInput2.addEventListener("input", handleUpdateInput)
    textInput1.addEventListener("keyup", handleChangeFocus)
    textInput1.addEventListener("mouseover", handleUpdateInput)
    textInput2.addEventListener("mouseover", handleUpdateInput)
    resolvedID1.addEventListener("click", handleFlip)
}