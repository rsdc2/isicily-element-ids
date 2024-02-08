import Handlers from "./handlers.js"
import Elems from "./elems.js"
import CSVIDConverter from "./csvIDConverter.js"
import XMLID from "./xmlid.js"

export default class Listener {
    static addListeners() {
        Elems.aboutBtn.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.aboutDiv.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.bodyDiv.addEventListener("click", Handlers.hideAllPopups)
        Elems.compressBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.compressXMLIDBtn.addEventListener("click", XMLID.create("xml_with_compressed_ids.xml", "compress"))
        Elems.convertOldIDsBtn.addEventListener("click", CSVIDConverter.create("id_conversions.csv"))
        Elems.convertOldXMLIDsBtn.addEventListener("click", XMLID.create("converted_epidoc.xml", "convert"))
        Elems.expandXMLIDBtn.addEventListener("click", XMLID.create("epidoc_with_expanded_ids.xml", "expand"))
        Elems.flipBtn.addEventListener("click", Handlers.handleFlip)
        Elems.midPointBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.notesBtn.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.notesDiv.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.setXMLIDBtn.addEventListener("click", XMLID.create("epidoc_with_ids.xml", "set"))
        Elems.setMidpointXMLIDBtn.addEventListener("click", XMLID.create("epidoc_with_midpoint_ids.xml", "setMidpoint"))
        Elems.textInput1.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
    
        Elems.textInput1.addEventListener("keyup", Handlers.handleChangeFocus)
        window.addEventListener("click", Handlers.hideAllPopups)
    }
}

