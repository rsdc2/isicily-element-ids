import Handlers from "./handlers.js"
import Elems from "./elems.js"
import CSVIDConverter from "./csvIDConverter.js"
import EpiDocFileHandler from "./xmlFileHandler.js"


export default class Listener {
    static addListeners() {
        Elems.aboutBtn.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.aboutDiv.addEventListener("click", Handlers.handleToggleShowAbout)
        Elems.bodyDiv.addEventListener("click", Handlers.hideAllPopups)
        Elems.compressBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.compressXMLIDBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "compress")
        )
        Elems.convertOldIDsBtn.addEventListener(
            "click", 
            CSVIDConverter.create("id_conversions.csv")
        )
        Elems.convertOldXMLIDsBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "convertFrom52")
        )
        Elems.convertNewXMLIDsBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "convertFrom100")
        )
        Elems.expandXMLIDBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "expand")
        )
        Elems.flipBtn.addEventListener("click", Handlers.handleFlip)
        Elems.lemmatizeFileBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("lemmatise", null)
        )
        Elems.midPointBtn.addEventListener("click", Handlers.handleToggleMode)
        Elems.notesBtn.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.notesDiv.addEventListener("click", Handlers.handleToggleShowNotes)
        Elems.removeAllXMLIDBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "remove")
        )
        Elems.setXMLIDBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "set")
        )
        Elems.setMidpointXMLIDBtn.addEventListener(
            "click", 
            EpiDocFileHandler.create("xmlid", "setMidpoint")
        )
        Elems.textInput1.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
        Elems.textInput2.addEventListener("keyup", Handlers.handleUpdateInput)
    
        Elems.textInput1.addEventListener("keyup", Handlers.handleChangeFocus)
        window.addEventListener("click", Handlers.hideAllPopups)
    }
}

