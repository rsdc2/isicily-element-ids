import { test } from "node:test"
import assert from "node:assert/strict"

/**
 * @template T
 * @template U
 * @callback parametrizeCallback
 * @param {T} orig
 * @returns {U} 
 */


export default class Parametrized {
    /**
     * Loops through each tuple and uses the parameters
     * to run a test
     * @template T
     * @template U
     * @param {[T, U, string][]} tuples 
     * @param {parametrizeCallback<T, U>} callback
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


