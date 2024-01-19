
import Parametrized from "./utils/parametrized.mjs"
import { randomISicID, randomTuples } from "./utils/random.mjs"

import Base from "../src/Pure/base.js"
import Compress from "../src/Pure/compress.js"
import Format from "../src/Pure/format.js"
import Constants from "../src/Pure/constants.js"

const parametrize = Parametrized.parametrize 
const { compressID, decompressID } = Compress
const BASE = new Base(Constants.CURRENTBASE)

/** @type{Array.<[string, string, string]>} */
const compressions = [
    ["ISic000001-00001", "AAKAB", "First token id"],
    ["ISic000000-00000", "AAAAA", "Zero token id"],
    ["ISic099999-99999", "ωωωωω", "Last token id"]
]

/** @type{Array.<[string, string, string]>} */
const conversions100to52 = [
    ["AAKAB", "AADkR", "First token id"]
]

/** @type{Array.<[string, string, string]>} */
const conversions52to100 = [
    ["AADkR", "AAKAB", "First token id"]
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
const additionalRoundtrips = randomTuples(30, randomISicID(BASE.index))

/**
 * 
 * @param {string} isicID 
 */
function compress(isicID) {
    const compressed = compressID(BASE)(isicID)
    return Format.removeUnderline(compressed)
}


/**
 * Compresses an ID and decompresses it again
 * @param {string} isicID
 * @returns {string} 
 */
function roundtrip(isicID) {
    const compressed = compressID(BASE)(isicID)
    const formattingRemoved = Format.removeUnderline(compressed)
    return decompressID(BASE)(formattingRemoved)
}

parametrize(compressions, compress)
parametrize(decompressions, decompressID(BASE))
parametrize([...roundtrips, ...additionalRoundtrips], roundtrip)
parametrize(conversions100to52, Compress.convert(Base.from(Constants.BASE100), Base.from(Constants.BASE52)))
parametrize(conversions52to100, Compress.convert(Base.from(Constants.BASE52), Base.from(Constants.BASE100)))