import FilePicker from "./filepicker.js"
import FileDownloader from "./filedownloader.js"
import {newFileReader} from "./filereader_.js"
import Base from "../Pure/base.js"
import EpiDoc from "./epidoc/epidoc.js"
import Message from "./message.js"
import { 
    ISicElementIDError,
    FileError
} from "../Pure/errors.js"

import Constants from "../Pure/constants/constants.js"
import { Config } from "../config.js"

const {BASE100, BASE52} = Constants


export default class XMLID {
    #picker 
    #reader

    /**
     * Create a new XMLIDApplier instance that applies IDs
     * to tokens in a tokenized EpiDoc XML file.
     * @param {string} filename
     * @param {"set"|"expand"|"compress"|"convert"|"setMidpoint"} mode 
     */
    constructor(filename, mode) {

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

                    const base100 = Base.fromBaseChars(BASE100)
                    const base52 = Base.fromBaseChars(BASE52)
                    const epidoc = EpiDoc.fromDoc(xml)

                    if (mode === "set") {
                        epidoc.textElems.setXMLIDs(base100, epidoc.id, Config.elementsWithXMLID)
                    } else if (mode === "expand") {
                        epidoc.textElems.expandXMLIDs(base100)
                    } else if (mode === "compress") {
                        epidoc.textElems.compressXMLIDs(base100)
                    } else if (mode === "convert") {
                        epidoc.textElems.convertXMLIDs(base52, base100)
                    } else if (mode === "setMidpoint") {
                        epidoc.textElems.setMidpointXMLIDs(base100)
                    }

                    const xmlStr = new XMLSerializer().serializeToString(xml)

                    const downloader = new FileDownloader(xmlStr)
                    downloader.download(filename)  
                } catch (error) {
                    if (error instanceof ISicElementIDError) {
                        Message.alert(error.message)
                    } else {
                        Message.alert(
                            `Unknown error: please refer to the developer console`
                        )
                        throw error    
                    }
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
     * @param {"set"|"expand"|"compress"|"convert"|"setMidpoint"} mode 
     * @returns 
     */
    static create(filename, mode) {

        function inner() {
            try {
                return new XMLID(filename, mode) 
            } catch (error) {
                if (error instanceof FileError) {
                    Message.alert(error.message)
                }
            }
        }
        return inner
    }
}