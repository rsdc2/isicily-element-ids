import { loadXML, loadEpiDoc } from "./file.mjs";
import { cwd } from "node:process"

function loadFile() {
    const epidoc = loadEpiDoc(
        "../SideEffects/epidoc/files/ISic000001_valid.xml"
    )
    console.log(epidoc.doc.documentElement.previousSibling)
    console.log(cwd())
}

loadFile()