import { JSDOM } from "jsdom"
import { readFileSync, writeFileSync } from "node:fs"
import EpiDoc from "../../src/SideEffects/epidoc/epidoc.js"
import HasXMLDoc from "../../src/SideEffects/xml/hasxmldoc.js"

// Cf. https://github.com/jsdom/jsdom/blob/main/lib/jsdom/living/domparsing/DOMParser-impl.js
// cf. https://stackoverflow.com/questions/59668971/save-xml-parsed-by-jsdom-as-a-file
// cf. https://stackoverflow.com/questions/42649700/using-domparser-in-javascript-testing-with-mocha-and-jsdom

const jsdom = new JSDOM()
const window = jsdom.window

export const DOMParser = window.DOMParser

export const XMLSerializer = window.XMLSerializer

export const ProcessingInstruction = window.ProcessingInstruction

export const Node = window.Node



/**
 * Load an XML file at the path
 * @param {string} path
 * @returns {XMLDocument} 
 */
export function loadXML(path) {
    const xmlStr = readFileSync(path, { encoding: "utf8" })
    return new DOMParser().parseFromString(xmlStr, "application/xml")
}

/**
 * Write an XML file out to a path
 * @param {XMLDocument} xmldoc
 * @param {string} path
 */
export function writeXML(xmldoc, path) {
    const hasxmldoc = new HasXMLDoc(xmldoc)
    const docstr = hasxmldoc.serializeToString(new XMLSerializer())
    writeFileSync(path, docstr)
}

/**
 * 
 * @param {string} path
 * @returns {EpiDoc} 
 */
export function loadEpiDoc(path) {
    return new EpiDoc(loadXML(path))
}