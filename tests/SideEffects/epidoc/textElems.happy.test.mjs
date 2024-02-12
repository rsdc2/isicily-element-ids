import { JSDOM } from "jsdom"
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

import EpiDoc from "../../../src/SideEffects/epidoc/epidoc.js"
import { ISicElementIDError } from "../../../src/Pure/errors.js"
import { NullIDError } from "../../../src/SideEffects/epidoc/errors.js"
import Base from "../../../src/Pure/base.js"
import Constants from "../../../src/Pure/constants/constants.js"

const {BASE100, BASE52} = Constants
const base100 = Base.fromBaseChars(BASE100)

const epidocFp = "./tests/SideEffects/epidoc/files/ISic000001_valid.xml"


test("Put an @xml:id on all text elements", (t) => {
    const xmlStr = readFileSync(epidocFp, { encoding: "utf8" })
    const xml = new JSDOM(xmlStr, { contentType: "application/xml" }).window.document
    const epidoc = new EpiDoc(xml)
    
    assert.doesNotThrow(() => {
        epidoc.textElems.assertNoIDs()
    }, NullIDError)

    epidoc.textElems.setXMLIDs(base100, epidoc.id)

    assert.doesNotThrow(() => {
        epidoc.textElems.assertAllElementsHaveID()
    }, NullIDError)
})


test("Put an @xml:id on element subset", (t) => {
    const xmlStr = readFileSync(epidocFp, { encoding: "utf8" })
    const xml = new JSDOM(xmlStr, { contentType: "application/xml" }).window.document
    const epidoc = new EpiDoc(xml)
    const elems = epidoc.textElems
    
    assert.doesNotThrow(() => {
        elems.assertNoIDs()
    }, NullIDError)

    elems.setXMLIDs(base100, epidoc.id, ["w"])

    const lbs = elems.subset(["lb"])
    const ws = elems.subset(["w"])
    assert.strictEqual(lbs[0].xmlid, null)
    assert.notStrictEqual(ws[0].xmlid, null)
})