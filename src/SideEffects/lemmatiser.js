import XML from "./xml/xml.js"
import EpiDoc from "./epidoc/epidoc.js"
import FileDownloader from "./fileDownloader.js"
import Message from "./message.js"
import { ISicElementIDError } from "../Errors/isicElementIDError.js"
import * as TypeDefs from "../Types/typedefs.js"



/**
 * 
 * @param {TypeDefs.LemmatiserMode} mode
 */
export function handleLemmatiseOnLoad (mode) {
    /**
     * 
     * @param {ProgressEvent<FileReader>} e 
     */
    const inner = (e) => {
        const contents = /** @type {string} */ (e.target.result) 

        // String because will use readAsText method to read
        try {
            const xml = XML.parseFromString(new DOMParser, contents)
            const epidoc = EpiDoc.fromDoc(xml)
            const textElems = epidoc.textElems

            // Lemmatise the tokens in the document
            textElems.lemmatise(["w", "num", "name"])
            
            // Serialize to string
            const xmlStr = epidoc.serializeToString(new XMLSerializer(), false)

            // Download the file
            const downloader = new FileDownloader(xmlStr)
            downloader.download(epidoc.filename("_lemmatised"))  

            // Print message that operation successful
            Message.alert("Successfully lemmatised XML document")

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