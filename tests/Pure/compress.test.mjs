
import Parametrized from "../utils/parametrized.mjs"
import { randomISicID, randomTuples } from "../utils/random.mjs"

import Base from "../../src/Pure/base.js"
import Compress from "../../src/Pure/compress.js"
import Format from "../../src/Pure/format.js"
import Constants from "../../src/Pure/constants.js"
import Convert from "../../src/Pure/convert.js"

const parametrize = Parametrized.parametrize 
const { compressID, decompressID } = Compress
const { BASE52, BASE100 } = Constants

const base52 = Base.fromBaseChars(BASE52)
const base100 = Base.fromBaseChars(BASE100)

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
    ["AADkR", "AAKAB", "ISic000001-(0)0001"],
    ["QuBFB", "MiyΠξ", "ISic012345-(0)6789"]
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
const additionalRoundtrips = randomTuples(30, randomISicID(base100.index))

/**
 * 
 * @param {string} isicID 
 */
function compress(isicID) {
    const compressed = compressID(base100)(isicID)
    return Format.removeUnderline(compressed)
}

/**
 * Compresses an ID and decompresses it again
 * @param {string} isicID
 * @returns {string} 
 */
function roundtrip(isicID) {
    const compressed = compressID(base100)(isicID)
    const formattingRemoved = Format.removeUnderline(compressed)
    return decompressID(base100)(formattingRemoved)
}

parametrize(compressions, compress)
parametrize(decompressions, decompressID(base100))
parametrize([...roundtrips, ...additionalRoundtrips], roundtrip)
parametrize(conversions100to52, Convert.ID(base100, base52))
parametrize(conversions52to100, Convert.ID(base52, base100))
