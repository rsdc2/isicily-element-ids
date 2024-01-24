
export default class FileDownloader {
    #fileContents
    #blob
    #anchor

    /**
     * 
     * @param {string | ArrayBuffer} fileContents 
     */
    constructor(fileContents) {

        this.#fileContents = fileContents
        this.#blob = this.#blobify(this.#fileContents)
        
        // Set up download anchor

        // cf. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
        this.#anchor = document.createElement("a")
        this.#anchor.remove()
    }

    get blob() {
        return this.#blob
    }

    /**
     * 
     * @param {string | ArrayBuffer} fileContents 
     * @returns {Blob}
     */
    #blobify(fileContents) {
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/Blob
        return new Blob([fileContents], {type: "text/plain"})
    }
    
    get fileContents() {    
        return this.#fileContents
    }

    /**
     * Download the file contents as a file
     * @param {string} filename
     */
    download(filename) {
        // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
        const url = window.URL.createObjectURL(this.#blob)

        this.#anchor.setAttribute("href", url)
        this.#anchor.setAttribute("download", filename)
        this.#anchor.click()
        
        // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
        window.URL.revokeObjectURL(url)
    }
}