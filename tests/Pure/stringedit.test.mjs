
import Parametrized from "../utils/parametrized.mjs"
import { comparison, findClosestZero } from "../../src/Pure/stringedit.js"
import { test } from "node:test"
import assert from "node:assert/strict"


const { parametrize } = Parametrized

const stringEditTests = /** @type {[[string, string], number, string][]}*/ (
    [
        // [["abc", "abd"], 1, "abc -> abd"],
        // [["abc", "abcd"], 1, "abc -> abcd"],
        // [["abcde", "abce"], 1, "abcde -> abce"],
        // [["abcd", "bed"], 2, "abcd -> bed"],
        // [["abcde", "ace"], 2, "abcd -> bed"],
        // [["abbcd", "abcd"], 1, "abbcd -> abcd"],
        // [["abcbd", "abcd"], 1, "abcbd -> abcd"],
        // [["abczzzabc", "abcabc"], 3, "abczzzabc -> abcabc"]
    ]) 

// parametrize(stringEditTests, comparison)


// const findNearestZeroTests =  /** @type {[number[][], [number, number], string][]}*/ ([
//     [ [[1, 2, 3], [4, 5, 6], [7, 8, 0]], [3, 3], "find 9" ]
// ])

// parametrize(findNearestZeroTests, findNearestZero)

test("find nearest zero 1", (t) => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
    const [x, y] = findClosestZero(arr, [0, 0])
    assert.strictEqual(x, 2)
    assert.strictEqual(y, 2)
})

test("find nearest zero 2", (t) => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
    const [x, y] = findClosestZero(arr, [1, 1])
    assert.strictEqual(x, 2)
    assert.strictEqual(y, 2)
})

test("find nearest zero 3", (t) => {
    const arr = [[1, 2, 3], [4, 5, 0], [7, 8, 9]]
    const [x, y] = findClosestZero(arr, [1, 1])
    assert.strictEqual(x, 1)
    assert.strictEqual(y, 2)
})

test("find nearest zero 3", (t) => {
    const arr = [[1, 2, 3], [4, 5, 0], [7, 8, 9]]
    const [x, y] = findClosestZero(arr, [1, 1])
    assert.strictEqual(x, 1)
    assert.strictEqual(y, 2)
})

test("find nearest zero 4", (t) => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    const nearest = findClosestZero(arr, [1, 1])
    assert.strictEqual(nearest, null)
})

test("find nearest zero 5", (t) => {
    const arr = [[0, 2, 3], [4, 5, 6], [7, 8, 9]]
    const nearest = findClosestZero(arr, [1, 1])
    assert.strictEqual(nearest, null)
})

