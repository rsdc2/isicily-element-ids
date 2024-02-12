// import { JSDOM } from "jsdom"
import { readFileSync, writeFileSync } from "node:fs"
import EpiDoc from "../../src/SideEffects/epidoc/epidoc.js"
import { DOMParser, XMLSerializer } from "./xml.mjs"
/**
 * Load an XML file at the path
 * @param {string} path
 * @returns {XMLDocument} 
 */
export function loadXML(path) {
    const xmlStr = readFileSync(path, { encoding: "utf8" })
    // const xml = new JSDOM(xmlStr, { contentType: "application/xml" }).window.document
    // const jsdom = new JSDOM()
    // const DOMParser = jsdom.window.DOMParser
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