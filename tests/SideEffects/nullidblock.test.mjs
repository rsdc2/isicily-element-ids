import { test } from "node:test"
import assert from "node:assert/strict"

import NullIDBlock from "../../src/SideEffects/epidoc/nullidblock.js"
import Base from "../../src/Pure/base.js"
import Constants from "../../src/Pure/constants/constants.js"
import { MidpointIDError } from "../../src/Errors/ids.js"

const {BASE52, BASE100} = Constants
const base = Base.fromBaseChars(BASE100)


test("Null ID block 1", (t) => {
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
    const block = new NullIDBlock(0, 1, "AAKAK", "AAKAU", base)
    const newids = block.newIDs
    const expectedIds = ["AAKAN", "AAKAQ"]

    assert.strictEqual(expectedIds.length, newids.length)
    assert.strictEqual(block.freeMidpointCount, 9)
    assert.strictEqual(block.intervalSize, 3)

    newids.forEach( (newid, index) => {
        assert.strictEqual(newid, expectedIds[index])
    })
})


test("Null ID block 3", (t) => {
    
    const block = new NullIDBlock(0, 8, "AAKAK", "AAKAU", base)
    const newids = block.newIDs
    const expectedIds = [
        "AAKAL", 
        "AAKAM", 
        "AAKAN", 
        "AAKAO", 
        "AAKAP", 
        "AAKAQ", 
        "AAKAR", 
        "AAKAS", 
        "AAKAT"
    ]

    assert.strictEqual(expectedIds.length, newids.length)
    assert.strictEqual(block.freeMidpointCount, 9)
    assert.strictEqual(block.intervalSize, 1)

    newids.forEach( (newid, index) => {
        assert.strictEqual(newid, expectedIds[index])
    })
})


test("NullIDBlock throws MidpointIDError when not enough IDs", (t) => {

    assert.throws( () => {
        const block = new NullIDBlock(0, 8, "AAKAK", "AAKAL", base)
    }, MidpointIDError)

})