import { loadXML, loadEpiDoc, ProcessingInstruction, Node, Text } from "./xml.mjs";
import { cwd } from "node:process"

import { JSDOM } from "jsdom"

import EpiDoc from "../../src/SideEffects/epidoc/epidoc.js";

// https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction
// https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction#xml_declaration


function loadFile() {
    const epidoc = loadEpiDoc(
        "../SideEffects/epidoc/files/input/ISic000001_valid.xml"
    )
    console.log(epidoc.XMLDeclaration)
    epidoc.createXMLDeclaration({throwOnFail: true})

    // epidoc.doc.insertBefore(new Text("\n"), epidoc.doc.firstChild)
    // console.log(epidoc.processingInstructions.map(item => item.data))
    console.log(epidoc.XMLDeclaration.data)
    // console.log(cwd())
}

loadFile()