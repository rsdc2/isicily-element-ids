import { test } from "node:test"
import assert from "node:assert/strict"

/**
 * @callback parametrizeCallback
 * @param {string} orig
 * @returns {string} 
 */


export default class Parametrized {
    /**
     * Loops through each tuple and uses the parameters
     * to run a test
     * @param {[string, string, string][]} tuples 
     * @param {parametrizeCallback} callback
     */
    static parametrize(tuples, callback) {
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
}


