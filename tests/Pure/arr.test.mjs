import { test } from "node:test"
import assert from "node:assert/strict"

import { Arr } from "../../src/Pure/arr.js"


test ("Last element of an array", (t) => {
    assert.strictEqual(Arr.last([1, 2, 3]), 3)
})


test ("Bottom right quadrant", (t) => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    const bottomRight = Arr.bottomRightQuadrant(arr, [1, 1])

    const benchmark = [[5, 6], [8, 9]]

    assert.strictEqual(Arr.eq2d(bottomRight, benchmark), true)
    assert.strictEqual(arr.length, 3)
})



test("find zeros", (t) => {
    const arr = [[1, 0, 3], [4, 5, 6], [7, 8, 9]]
    const coords = Arr.find2d(arr, 0, [2, 2])
    assert.strictEqual(coords.length, 0)
})