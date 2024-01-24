
/**
 * @callback fileReaderOnLoad
 * @param {ProgressEvent<FileReader>} e
 */

export default class FileReader_ extends FileReader{

    /**
     * 
     * @param {fileReaderOnLoad} onload 
     */
    constructor(onload) {

        super()
        // Set up reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.onload = onload

    }
    
}