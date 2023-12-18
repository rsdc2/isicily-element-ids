function addListeners() {
    aboutBtn.addEventListener("click", handleToggleShowAbout)
    aboutDiv.addEventListener("click", handleToggleShowAbout)
    bodyDiv.addEventListener("click", hideAllPopups)
    compressBtn.addEventListener("click", handleToggleMode)
    flipBtn.addEventListener("click", handleFlip)
    midPointBtn.addEventListener("click", handleToggleMode)
    notesBtn.addEventListener("click", handleToggleShowNotes)
    notesDiv.addEventListener("click", handleToggleShowNotes)
    resolvedID1.addEventListener("click", handleFlip)
    textInput1.addEventListener("input", handleUpdateInput)
    textInput2.addEventListener("input", handleUpdateInput)
    textInput1.addEventListener("keyup", handleChangeFocus)
    textInput1.addEventListener("mouseover", handleUpdateInput)
    textInput2.addEventListener("mouseover", handleUpdateInput)

    window.addEventListener("click", hideAllPopups)
}