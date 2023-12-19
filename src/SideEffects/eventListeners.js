function addListeners() {
    aboutBtn.addEventListener("click", handleToggleShowAbout)
    aboutDiv.addEventListener("click", handleToggleShowAbout)
    bodyDiv.addEventListener("click", hideAllPopups)
    compressBtn.addEventListener("click", handleToggleMode)
    flipBtn.addEventListener("click", handleFlip)
    midPointBtn.addEventListener("click", handleToggleMode)
    notesBtn.addEventListener("click", handleToggleShowNotes)
    notesDiv.addEventListener("click", handleToggleShowNotes)
    textInput1.addEventListener("keyup", handleUpdateInput)
    textInput2.addEventListener("keyup", handleUpdateInput)

    textInput1.addEventListener("keyup", handleChangeFocus)
    window.addEventListener("click", hideAllPopups)
}