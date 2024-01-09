
import * as Handler from "./eventHandlers.js"
import * as Elements from "./elements.js"

export function addListeners() {
    Elements.aboutBtn.addEventListener("click", Handler.handleToggleShowAbout)
    Elements.aboutDiv.addEventListener("click", Handler.handleToggleShowAbout)
    Elements.bodyDiv.addEventListener("click", Handler.hideAllPopups)
    Elements.compressBtn.addEventListener("click", Handler.handleToggleMode)
    Elements.flipBtn.addEventListener("click", Handler.handleFlip)
    Elements.midPointBtn.addEventListener("click", Handler.handleToggleMode)
    Elements.notesBtn.addEventListener("click", Handler.handleToggleShowNotes)
    Elements.notesDiv.addEventListener("click", Handler.handleToggleShowNotes)
    Elements.textInput1.addEventListener("keyup", Handler.handleUpdateInput)
    Elements.textInput2.addEventListener("keyup", Handler.handleUpdateInput)

    Elements.textInput1.addEventListener("keyup", Handler.handleChangeFocus)
    window.addEventListener("click", Handler.hideAllPopups)
}