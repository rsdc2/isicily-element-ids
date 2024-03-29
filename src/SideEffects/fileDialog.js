import { FileError } from "../Errors/file.js"
import Constants from "../Pure/constants/constants.js"
import Message from "./message.js"
import FileValidator from "./fileValidator.js"

/**
 * @callback onchangeFunc
 * @param {Event} e
 */

export default class FileDialog {
    #dialog 
    
    /**
     * Create a FilePicker instance 
     * @param {string[]} fileExts Array of acceptable file extensions
     * @param {FileReader} fileReader
     */
    constructor(fileExts, fileReader) {

        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        // Set up file dialog
        this.#dialog = document.createElement("input")
        this.#dialog.setAttribute("type", "file")
        this.#dialog.setAttribute("accept", fileExts.join(","))     

        this.#dialog.onchange = this.onFileLoaded(fileReader, fileExts)
    }
    
    /**
     * Returns a function that creates a file picker with particular parameters
     * @param {string[]} fileExts Array of acceptable file extensions
     * @param {FileReader} fileReader
     */
    static create(fileExts, fileReader) {

        function inner() {
            return new FileDialog(fileExts, fileReader) 
        }

        return inner
    }
     
    /**
     * Show the file picker
     */
    load() {
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        this.#dialog.click()
    }

    /**
     * @param {FileReader} fileReader
     * @param {Array.<string>} exts 
     */
    onFileLoaded(fileReader, exts) {

        /**
         * @param {Event} e
         */
        function inner(e) {
            const target = /** @type {HTMLInputElement} */ (e.target)
            const files = target.files
            
            try {

                let file;
                
                // Check that there is a file
                if (files.length === 0) {
                    throw new FileError("No files selected")
                } else {
                    file = files[0]
                }
    
                // Validate the file's properties
                FileValidator.assertFileExt(file, exts)
                FileValidator.assertSize(file, Constants.MAXFILESIZEKB)
                
                fileReader.readAsText(file)
                this.remove()        

    
            } catch (error) {
                if (error instanceof FileError) {
                    Message.error(error.message)
                } else {
                    throw error
                }
            }
    
        }

        return inner
    }

    /**
     * Remove the file picker from the DOM
     */
    remove() {
        this.#dialog.remove()
    }

}