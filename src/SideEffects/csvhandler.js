

export default class CSVHandler {
    #picker 
    #reader
    #contents
    #anchor

    constructor() {

        // Set up reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.#reader = new FileReader()
        this.#reader.onload = (e) => {
            this.#contents = e.target.result
            this.#download()
        }

        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        // Set up picker
        this.#picker = document.createElement("input")

        this.#picker.setAttribute("type", "file")
        this.#picker.setAttribute("accept", ".txt")     

        this.#picker.onchange = (e) => {
            const target = /** @type {HTMLInputElement} */ (e.target)
            const files = target.files
            this.#reader.readAsText(files[0])
            this.#picker.remove()
        }        
        
        // Set up download anchor

        // cf. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
        this.#anchor = document.createElement("a")

        this.#load()
    }

    get blob() {
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/Blob
        return new Blob([this.#contents], {type: "text/plain"})
    }
    
    get contents() {    
        return this.#contents
    }

    static create() {
        return new CSVHandler() 
    }

    /**
     * Download the file contents as a file
     */
    #download() {
        // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
        const url = window.URL.createObjectURL(this.blob)

        this.#anchor.setAttribute("href", url)
        this.#anchor.setAttribute("download", "csvfile.txt")
        this.#anchor.click()
        
        // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
        window.URL.revokeObjectURL(url)
    }

     
    #load() {
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
        // under 'Using hidden file input elements using the click() method'
        this.#picker.click()
    }

}