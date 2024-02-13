import { loadXML, loadEpiDoc } from "./xml.mjs";
import { cwd } from "node:process"

// https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction
// https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction#xml_declaration


function loadFile() {
    const epidoc = loadEpiDoc(
        "../SideEffects/epidoc/files/ISic000001_valid.xml"
    )
    console.log(epidoc.doc.documentElement.previousSibling)
    console.log(cwd())
}

loadFile()