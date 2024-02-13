import Format from "../../src/Pure/format.js"
import Base from "../../src/Pure/base.js"
import Constants from "../../src/Pure/constants/constants.js"
import Compress from "../../src/Pure/compress.js"

const { BASE52, BASE100 } = Constants

/**
 * Function for generating all compressed IDs and checking that 
 * converting them back to the original ID generates the same ID.
 * Since all generated IDs are unique, all compressed IDs 
 * must also be unique.
 * @param {Base} base
 * @returns {string}
 */

function checkCompressedIDsUnique(base) {

    const max = 400000000    

    for (let i=0; i<max; i++) {
        const id = Format.padAndInsertISic(String(i), base.index)
        const compressed = Compress.compressID(base)(id)
        const decompressed = Compress.decompressID(base)(compressed)
        if (id !== decompressed) {
            return `These IDs are not the same: ${id}, ${decompressed}`
        }
    }

    return "unique"
}

const unique = checkCompressedIDsUnique(Base.fromBaseChars(BASE52))
console.log(unique)