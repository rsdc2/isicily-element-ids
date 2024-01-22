import FilePicker from "./filepicker.js"
import FileDownloader from "./filedownloader.js"

export default class CSVHandler {
    #picker 
    #reader

    /**
     * 
     * @param {string} filename 
     */
    constructor(filename) {

        // Set up reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.#reader = new FileReader()
        this.#reader.onload = (e) => {
            const contents = e.target.result
            const downloader = new FileDownloader(contents)
            downloader.download(filename)
        }

        // Set up picker
        this.#picker = new FilePicker ( 
            (e) => {
                const target = /** @type {HTMLInputElement} */ (e.target)
                const files = target.files
                this.#reader.readAsText(files[0])
                this.#picker.remove()
            }, [".txt"]
        )
        
        this.#picker.load()
    }
    
    /**
     * Create a CSVHandler that downloads a file with a specific filename
     * @param {string} filename 
     * @returns 
     */
    static create(filename) {

        function inner() {
            return new CSVHandler(filename) 
        }
        return inner
    }
}