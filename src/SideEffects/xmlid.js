import FileDialog from "./fileDialog.js"
import FileDownloader from "./fileDownloader.js"
import {newFileReader} from "./fileReader_.js"
import Base from "../Pure/base.js"
import EpiDoc from "./epidoc/epidoc.js"
import Message from "./message.js"
import { ISicElementIDError } from "../Errors/isicElementIDError.js"
import { FileError } from "../Errors/file.js"

import Constants from "../Pure/constants/constants.js"
import { Config } from "../config.js"
import { XMLParsingError } from "../Errors/xml.js"
import XML from "./xml/xml.js"

const {BASE100, BASE52} = Constants


export default class XMLID {
    #dialog 
    #reader

    /**
     * Create a new XMLIDApplier instance that applies IDs
     * to tokens in a tokenized EpiDoc XML file.
     * @param {"set"|"expand"|"compress"|"convertFrom52"|"convertFrom100"|"setMidpoint"|"remove"} mode 
     */
    constructor(mode) {

        // Initialize reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.#reader = newFileReader(
            (e) => {
                const contents = /** @type {string} */ (e.target.result) 

                // String because will use readAsText method to read
                try {
                    const xml = XML.parseFromString(new DOMParser, contents)

                    const base100 = Base.fromBaseChars(BASE100)
                    const base52 = Base.fromBaseChars(BASE52)
                    const epidoc = EpiDoc.fromDoc(xml)
                    const textElems = epidoc.textElems

                    // Stores the filename suffixes and functions
                    // associated with the different modes
                    const funcsAndLabels = {
                        "set": {
                            suffix: "_ids_set",
                            func: () => textElems.setXMLIDs(
                                base100, 
                                epidoc.id,
                                Config.elementsForXMLID
                            )
                        },
                        "expand": {
                            suffix: "_expanded_ids",
                            func: () => textElems.expandXMLIDs(base100)
                        },
                        "compress": {
                            suffix: "_compressed_ids",
                            func: () => textElems.compressXMLIDs(base100)
                        },
                        "remove": {
                            suffix: "_ids_removed",
                            func: () => textElems.removeXMLIDs()
                        },
                        "convertFrom52": {
                            suffix: "_ids_converted_from_base_52",
                            func: () => textElems.convertXMLIDs(base52, base100)
                        },
                        "convertFrom100": {
                            suffix: "_ids_converted_from_base_100",
                            func: () => textElems.convertXMLIDs(base100, base52)
                        },
                        "setMidpoint": {
                            suffix: "_midpoints_set",
                            func: () => textElems.setMidpointXMLIDs(
                                base100,
                                Config.elementsForXMLID
                            )
                        }
                    }

                    // Call the appropriate function based on the mode
                    funcsAndLabels[mode].func()
                    
                    // Serialize to string
                    const xmlStr = epidoc.serializeToString(new XMLSerializer(), false)

                    // Download the file
                    const downloader = new FileDownloader(xmlStr)
                    downloader.download(epidoc.filename(funcsAndLabels[mode].suffix))  

                    // Print message that operation successful
                    Message.alert("Successfully processed XML document")

                } catch (error) {
                    if (error instanceof ISicElementIDError) {
                        Message.error(error.message)
                    } else {
                        Message.error(
                            `Unknown error: please refer to the developer console`
                        )
                        throw error    
                    }
                }  
            }
        )

        // Initialize the file dialog
        this.#dialog = new FileDialog ([".xml"], this.#reader)
        
        // Show the file dialog
        this.#dialog.load()
    }
 

    /**
     * Create an XMLIDApplier that downloads a file with a specific filename
     * when called
     * @param {"set"|"expand"|"compress"|"convertFrom52"|"convertFrom100"|"setMidpoint"|"remove"} mode 
     * @returns 
     */
    static create(mode) {

        function inner() {
            try {
                return new XMLID(mode) 
            } catch (error) {
                if (error instanceof FileError) {
                    Message.error(error.message)
                }
            }
        }
        return inner
    }
}