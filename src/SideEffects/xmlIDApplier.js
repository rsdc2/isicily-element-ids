import FilePicker from "./filepicker.js"
import FileDownloader from "./filedownloader.js"
import {newFileReader} from "./filereader_.js"
import Convert from "../Pure/convert.js"
import Base from "../Pure/base.js"
import Message from "./message.js"
import { 
    BaseIndexError, 
    BaseLengthError, 
    BaseValueError, 
    ConversionError, 
    CSVFormatError, 
    FileError} from "../Pure/errors.js"
import Constants from "../Pure/constants.js"
import EpiDoc from "../Pure/epidoc/epidoc.js"


export default class XMLIDApplier {
    #picker 
    #reader

    /**
     * Create a new XMLIDApplier instance that applies IDs
     * to tokens in a tokenized EpiDoc XML file.
     * @param {string} filename 
     */
    constructor(filename) {

        // Initialize reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.#reader = newFileReader(
            (e) => {
                const contents = /** @type {string} */ (e.target.result) 
                // String because will use readAsText method to read
                try {
                    const xml = new DOMParser().parseFromString(
                        contents, 
                        'application/xml'
                    )

                    const epidoc = EpiDoc.fromDoc(xml)
                    console.log(epidoc.editions[0].elem)

                    const xmlStr = new XMLSerializer().serializeToString(xml)

                    const downloader = new FileDownloader(xmlStr)
                    // downloader.download(filename)  
                } catch (error) {
                    Message.alert(
                        `Unknown error: please refer to the developer console`
                    )
                }  
            }
        )

        // Initialize file picker
        this.#picker = new FilePicker ([".xml"], this.#reader)
        
        // Show the file picker
        this.#picker.load()
    }
 

    /**
     * Create an XMLIDApplier that downloads a file with a specific filename
     * when called
     * @param {string} filename 
     * @returns 
     */
    static create(filename) {

        function inner() {
            try {
                return new XMLIDApplier(filename) 
            } catch (error) {
                if (error instanceof FileError) {
                    Message.alert(error.message)
                }
            }
        }
        return inner
    }
}