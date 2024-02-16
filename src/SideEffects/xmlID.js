import Base from "../Pure/base.js"
import XML from "./xml/xml.js"
import Constants from "../Pure/constants/constants.js"
import EpiDoc from "./epidoc/epidoc.js"
import FileDownloader from "./fileDownloader.js"
import Message from "./message.js"
import { Config } from "../config.js"
import { ISicElementIDError } from "../Errors/isicElementIDError.js"


const { BASE52, BASE100 } = Constants

/**
 * 
 * @param {"set"|"expand"|"compress"|"convertFrom52"|"convertFrom100"|"setMidpoint"|"remove"} mode 
 */
export function handleXMLIDOnLoad (mode) {
    /**
     * 
     * @param {ProgressEvent<FileReader>} e 
     */
    const inner = (e) => {
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
    return inner

}