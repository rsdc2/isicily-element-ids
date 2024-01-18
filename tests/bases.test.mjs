import { test } from "node:test"
import assert from "node:assert/strict"


import Compress from "../src/Pure/compress.js"

const compressions = [
    ["ISic000001-00001", "AAKAB", "First token id"],
    ["ISic000000-00000", "AAAAA", "Zero token id"],
    ["ISic099999-99999", "<u>ωωωωω</u>", "Last token id"]
]

const roundtrips = compressions.map (
    tuple => {
        const [orig, _, name] = tuple
        return /** @type {[string, string, string]} */ ([orig, orig, name])
    }
)


/**
 * @callback parametrizeCallback
 * @param {string} orig
 * @returns {string} 
 */

/**
 * 
 * @param {[string, string][]} tuples 
 * @param {parametrizeCallback} callback
 */
function parametrize( tuples, callback) {
    tuples.forEach( 
        tuple => {
            const [orig, benchmark, name] = tuple
            const actual = callback(orig)
            test (name, (t) => {
                assert.strictEqual(actual, benchmark)
            })
        }
    ) 
}

/**
 * 
 * @param {string} isicID
 * @returns {string} 
 */
function roundtrip(isicID) {
    const compressed = Compress.compressID(isicID)
    return Compress.decompressID(compressed)
}


parametrize(compressions, Compress.compressID)
parametrize(roundtrips, roundtrip)