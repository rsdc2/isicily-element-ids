import { JSDOM } from "jsdom"
import { readFileSync, writeFileSync } from "node:fs"
import EpiDoc from "../../src/SideEffects/epidoc/epidoc.js"

/**
 * Load an XML file at the path
 * @param {string} path
 * @returns {XMLDocument} 
 */
export function loadXML(path) {
    const xmlStr = readFileSync(path, { encoding: "utf8" })
    const xml = new JSDOM(xmlStr, { contentType: "application/xml" }).window.document
    return xml
}

/**
 * Write an XML file out to a path
 * @param {XMLDocument} xmldoc
 * @param {string} path
 */
export function writeXML(xmldoc, path) {
    const docstr = xmldoc.documentElement.outerHTML
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