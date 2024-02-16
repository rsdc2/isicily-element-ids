import { readFile, readFileSync, writeFileSync } from "node:fs"


/**
 * Functions for manipulating objects and string
 * representations of objects
 */

import { lemmataLatin } from "../../src/Pure/constants/lemmataLatin.js";


/**
 * Deep copy object and sort alphabetically
 * @param {object} obj 
 */
export function sort(obj) {
    const sortedKeys = Object.keys(obj).sort()
    const sortedObj = {}
    sortedKeys.forEach(
        (key) => {
            sortedObj[key] = lemmataLatin[key]
        }
    )
    return sortedObj
}

/**
 * 
 * @param {object} obj 
 */
export function prettyPrint(obj) {
    return JSON
        .stringify(obj)
        .replace(/","/g, "\",\n\t\"")
        .replace(/\{/g, "{\n\t")
        .replace(/\}/g, "\n}")
}

/**
 * 
 * @param {string} src
 */
export function JSONToObj(src) {
    let json = readFileSync(src + ".json", { encoding: "utf8" })
    return JSON.parse(json)
}   

/**
 * 
 * @param {string} objStr 
 * @param {string} varName 
 * @param {string} varType 
 */
export function formatAsVariable(objStr, varName, varType) {
    return `export ${varType} ${varName} = ` + objStr
}

