/**
 * Functions for manipulating objects and string
 * representations of objects
 */

import { lemmata } from "../../src/Pure/constants/lemmata.js";
import { writeFileSync } from "node:fs"


/**
 * Deep copy object and sort alphabetically
 * @param {object} obj 
 */
function sort(obj) {
    const sortedKeys = Object.keys(obj).sort()
    const sortedObj = {}
    sortedKeys.forEach(
        (key) => {
            sortedObj[key] = lemmata[key]
        }
    )
    return sortedObj
}

/**
 * 
 * @param {object} obj 
 */
function prettyPrint(obj) {
    return JSON
        .stringify(obj)
        .replace(/","/g, "\",\n\t\"")
        .replace(/\{/g, "{\n\t")
        .replace(/\}/g, "\n}")
}

/**
 * 
 * @param {string} objStr 
 * @param {string} varName 
 * @param {string} varType 
 */
function formatAsVariable(objStr, varName, varType) {
    return `export ${varType} ${varName} = ` + objStr
}

/**
 * Export the lemmata object as a .js file
 */
function lemmataToFile() {
    const sorted = sort(lemmata)
    const prettyPrinted = prettyPrint(sorted)
    const variable = formatAsVariable(prettyPrinted, "lemmata", "const")
    writeFileSync("sorted.js", variable)    
}

lemmataToFile()