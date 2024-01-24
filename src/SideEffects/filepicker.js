
/**
 * @callback onchangeFunc
 * @param {Event} e
 */

export default class FilePicker {
    #picker 
    
    /**
     * 
     * @param {onchangeFunc} onchange
     * @param {string[]} fileExts Array of acceptable file extensions
     */
    constructor(onchange, fileExts) {

        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        // Set up picker
        this.#picker = document.createElement("input")

        this.#picker.setAttribute("type", "file")
        this.#picker.setAttribute("accept", fileExts.join(","))     

        this.#picker.onchange = onchange
    }
    
    /**
     * Returns a function that creates a file picker with particular parameters
     * @param {onchangeFunc} onchange
     * @param {string[]} fileExts Array of acceptable file extensions
     */
    static create(onchange, fileExts) {

        function inner() {
            return new FilePicker(onchange, fileExts) 
        }

        return inner
    }
     
    load() {
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        this.#picker.click()
    }

    remove() {
        this.#picker.remove()
    }

}