import { writeFileSync } from "node:fs"

import { lemmataLatin } from "../../src/Pure/constants/lemmataLatin.js"
import {sort, prettyPrint, formatAsVariable, JSONToObj} from "./object.mjs"


/**
 * Export the lemmata object as a .js file
 * @param {object} lemmata
 * @param {string} varName
 * @param {string} dst
 * @param {boolean} [sortObj=false]
 */
function writeLemmataFromVarToJS(lemmata, varName, dst, sortObj=false) {
    const lemmata_ = sortObj ? sort(lemmata) : lemmata
    const prettyPrinted = prettyPrint(lemmata_)
    const variable = formatAsVariable(prettyPrinted, varName, "const")
    writeFileSync(dst + ".js", variable)    
}

/**
 * 
 * @param {string} src
 * @param {string} varName
 * @param {string} dst 
 */
function writeLemmataFromJSONToJS(src, varName, dst) {
    const lemmata = JSONToObj(src)
    writeLemmataFromVarToJS(lemmata, varName, dst)
}

writeLemmataFromJSONToJS("greek_lemmata", "greek_lemmata", "greek_lemmata")

// writeLemmataFromJSONToJS("latin_lemmata", "latin_lemmata", "latin_lemmata")