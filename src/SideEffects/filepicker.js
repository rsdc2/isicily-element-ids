import {FileError} from "../Pure/errors.js"
import Constants from "../Pure/constants.js"
import Message from "./message.js"
import FileValidator from "./fileValidator.js"

/**
 * @callback onchangeFunc
 * @param {Event} e
 */

export default class FilePicker {
    #picker 
    #exts
    
    /**
     * Create a FilePicker instance 
     * @param {string[]} fileExts Array of acceptable file extensions
     * @param {FileReader} fileReader
     */
    constructor(fileExts, fileReader) {

        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        // Set up picker
        this.#picker = document.createElement("input")
        this.#exts = fileExts
        this.#picker.setAttribute("type", "file")
        this.#picker.setAttribute("accept", fileExts.join(","))     

        this.#picker.onchange = this.onFileLoaded(fileReader, fileExts)
    }
    
    /**
     * Returns a function that creates a file picker with particular parameters
     * @param {string[]} fileExts Array of acceptable file extensions
     * @param {FileReader} fileReader
     */
    static create(fileExts, fileReader) {

        function inner() {
            return new FilePicker(fileExts, fileReader) 
        }

        return inner
    }
     
    /**
     * Show the file picker
     */
    load() {
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        this.#picker.click()
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
                    Message.alert(error.message)
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
        this.#picker.remove()
    }

}