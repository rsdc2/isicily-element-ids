import Handlers from "./handlers.js"
import Elems from "./elems.js"
import CSVIDConverter from "./csvIDConverter.js"

export default class Listener {
    static addListeners() {
        Elems.aboutBtn.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.aboutDiv.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.bodyDiv.addEventListener("click", Handlers.hideAllPopups)
        Elems.compressBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.convertOldIDsBtn.addEventListener("click", CSVIDConverter.create("id_conversions.csv"))
        Elems.idXMLBtn.addEventListener("click", )
        Elems.flipBtn.addEventListener("click", Handlers.handleFlip)
        Elems.midPointBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.notesBtn.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.notesDiv.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.textInput1.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
    
        Elems.textInput1.addEventListener("keyup", Handlers.handleChangeFocus)
        window.addEventListener("click", Handlers.hideAllPopups)
    }
}

