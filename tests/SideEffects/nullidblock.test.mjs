import { test } from "node:test"
import assert from "node:assert/strict"

import NullIDBlock from "../../src/SideEffects/epidoc/nullidblock.js"
import Base from "../../src/Pure/base.js"
import Constants from "../../src/Pure/constants.js"
import Format from "../../src/Pure/format.js"

const {BASE52, BASE100} = Constants

test("Null ID block", (t) => {
    const base = Base.fromBaseChars(BASE100)
    const block = new NullIDBlock(0, 0, "AAKAK", "AAKAU", base)
    const newids = block.newIDs
    const expectedIds = ["AAKAP"]

    assert.strictEqual(expectedIds.length, newids.length)
    assert.strictEqual(block.freeMidpointCount, 9)
    assert.strictEqual(block.intervalSize, 5)

    newids.forEach( (newid, index) => {
        assert.strictEqual(newid, expectedIds[index])
    })
})


test("Null ID block 2", (t) => {
    const base = Base.fromBaseChars(BASE100)
    const block = new NullIDBlock(0, 1, "AAKAK", "AAKAU", base)
    const newids = block.newIDs
    const expectedIds = ["AAKAN", "AAKAO"]

    assert.strictEqual(expectedIds.length, newids.length)
    assert.strictEqual(block.freeMidpointCount, 9)
    assert.strictEqual(block.intervalSize, 4)

    newids.forEach( (newid, index) => {
        assert.strictEqual(newid, expectedIds[index])
    })
})