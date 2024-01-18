
import Parametrized from "./utils/parametrized.mjs"
import { randomISicID, randomTuples } from "./utils/random.mjs"
import Compress from "../src/Pure/compress.js"
import Format from "../src/Pure/format.js"

const parametrize = Parametrized.parametrize 

/** @type{Array.<[string, string, string]>} */
const compressions = [
    ["ISic000001-00001", "AAKAB", "First token id"],
    ["ISic000000-00000", "AAAAA", "Zero token id"],
    ["ISic099999-99999", "ωωωωω", "Last token id"],
    // ["ISic323257-21994", "ISic089097-4331"]
]

/** @type{Array.<[string, string, string]>} */
const decompressions = [
    ["AAKAB", "ISic000001-00001", "First token id"],
    ["AAAAA", "ISic000000-00000", "Zero token id"],
    ["ωωωωω", "ISic099999-99999", "Last token id"],

]

const roundtrips = compressions.map (
    tuple => {
        const [orig, _, name] = tuple
        return /** @type {[string, string, string]} */ ([orig, orig, name])
    }
)

/** @type {[string, string, string][]} */
const additionalRoundtrips = randomTuples(30, randomISicID)

/**
 * 
 * @param {string} isicID 
 */
function compress(isicID) {
    const compressed = Compress.compressID(isicID)
    return Format.removeUnderline(compressed)
}

/**
 * Compresses an ID and decompresses it again
 * @param {string} isicID
 * @returns {string} 
 */
function roundtrip(isicID) {
    const compressed = Compress.compressID(isicID)
    const formattingRemoved = Format.removeUnderline(compressed)
    return Compress.decompressID(formattingRemoved)
}

parametrize(compressions, compress)
parametrize(decompressions, Compress.decompressID)
parametrize([...roundtrips, ...additionalRoundtrips], roundtrip)