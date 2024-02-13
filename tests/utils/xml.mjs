import { JSDOM } from "jsdom"
import { readFileSync, writeFileSync } from "node:fs"
import EpiDoc from "../../src/SideEffects/epidoc/epidoc.js"

// Cf. https://github.com/jsdom/jsdom/blob/main/lib/jsdom/living/domparsing/DOMParser-impl.js
// cf. https://stackoverflow.com/questions/59668971/save-xml-parsed-by-jsdom-as-a-file
// cf. https://stackoverflow.com/questions/42649700/using-domparser-in-javascript-testing-with-mocha-and-jsdom

export const DOMParser = new JSDOM().window.DOMParser

export const XMLSerializer = new JSDOM().window.XMLSerializer

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
    const docstr = new XMLSerializer().serializeToString(xmldoc)
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