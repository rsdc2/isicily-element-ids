import FileDialog from "./fileDialog.js"
import {newFileReader} from "./fileReader_.js"
import Message from "./message.js"
import { FileError } from "../Errors/file.js"
import { handleXMLIDOnLoad } from "./xmlID.js"
import { handleLemmatiseOnLoad } from "./lemmatiser.js"

// cf. https://stackoverflow.com/questions/49836644/how-to-import-a-typedef-from-one-file-to-another-in-jsdoc-using-node-js
import "../Types/typedefs.js"


export default class xmlFileHandler {
    #dialog 
    #reader

    /**
     * Create a new XMLIDApplier instance that applies IDs
     * to tokens in a tokenized EpiDoc XML file.
     * @param {"lemmatise"|"xmlid"} modeType
     * @param {XMLIDMode | null} mode 
     */
    constructor(modeType, mode) {
        

        // Initialize reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        if (modeType === "xmlid") {
            this.#reader = newFileReader(handleXMLIDOnLoad(mode))
        } else if (modeType === "lemmatise") {
            this.#reader = newFileReader(handleLemmatiseOnLoad("lemmatise"))
        }

        // Initialize the file dialog
        this.#dialog = new FileDialog ([".xml"], this.#reader)
        
        // Show the file dialog
        this.#dialog.load()
    }
 

    /**
     * Create a new XMLIDApplier instance that applies IDs
     * to tokens in a tokenized EpiDoc XML file.
     * @param {"lemmatise"|"xmlid"} modeType
     * @param {XMLIDMode | null} mode 
     * @returns 
     */
    static create(modeType, mode) {

        function inner() {
            try {
                return new xmlFileHandler(modeType, mode) 
            } catch (error) {
                if (error instanceof FileError) {
                    Message.error(error.message)
                }
            }
        }
        return inner
    }
}