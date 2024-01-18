import Handlers from "./eventHandlers.js"
import Elems from "./elements.js"
export default class Listener {
    static addListeners() {
        Elems.aboutBtn.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.aboutDiv.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.bodyDiv.addEventListener("click", Handlers.hideAllPopups)
        Elems.compressBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.flipBtn.addEventListener("click", Handlers.handleFlip)
        Elems.midPointBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.notesBtn.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.notesDiv.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.textInput1.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
    
        Elems.textInput1.addEventListener("keyup", Handlers.handleChangeFocus)
        window.addEventListener("click", Handlers.hideAllPopups)
    }
}

