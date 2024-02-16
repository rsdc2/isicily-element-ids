import { lemmata } from "../../src/Pure/constants/lemmata.js";
import { readFileSync, writeFileSync } from "node:fs"


/**
 * Deep copy object and sort alphabetically
 * @param {object} obj 
 */
function sortObject(obj) {
    // const copied = JSON.parse(JSON.stringify(obj))
    const sortedKeys = Object.keys(obj).sort()
    const sortedObj = {}
    sortedKeys.forEach(
        (key) => {
            sortedObj[key] = lemmata[key]
        }
    )
    return sortedObj
}

function sortLemmataAndSave() {
    const str = "export const lemmata = " + JSON
        .stringify(sortObject(lemmata))
        .replace(/","/g, "\",\n\t\"")
        .replace(/\{/g, "{\n\t")
        .replace(/\}/g, "\n}")
    writeFileSync("sorted.js", str)    
}

sortLemmataAndSave()