import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc, writeXML } from "../../utils/file.mjs"

import { Arr } from "../../../src/Pure/arr.js"
import { NullIDError } from "../../../src/SideEffects/epidoc/errors.js"
import Base from "../../../src/Pure/base.js"
import Constants from "../../../src/Pure/constants/constants.js"
import { Config } from "../../../src/config.js"

const {BASE100, BASE52} = Constants
const base100 = Base.fromBaseChars(BASE100)
const relpath = "./tests/SideEffects/epidoc/files/"

const files = new Map([
    ["ISic000001Valid", relpath + "ISic000001_valid.xml"],
    ["ISic001174NoIDs", relpath + "ISic001174_tokenized_without_ids.xml"],
    ["ISic001174WithIDs", relpath + "ISic001174_tokenized_with_ids_pyepidoc.xml"]
])


test("Put an @xml:id on all text elements", (t) => {
    const epidoc = loadEpiDoc(files.get("ISic000001Valid"))
    
    assert.doesNotThrow(() => {
        epidoc.textElems.assertNoIDs()
    }, NullIDError)

    epidoc.textElems.setXMLIDs(base100, epidoc.id)

    assert.doesNotThrow(() => {
        epidoc.textElems.assertAllElementsHaveID()
    }, NullIDError)
})


test("Put an @xml:id on element subset", (t) => {
    const epidoc = loadEpiDoc(files.get("ISic000001Valid"))
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


test("Check IDs are the same as those assigned by PyEpiDoc", (t) => {
    const withIDs = loadEpiDoc(files.get("ISic001174WithIDs"))
    const noIDs = loadEpiDoc(files.get("ISic001174NoIDs"))
    
    noIDs.textElems.setXMLIDs(base100, noIDs.id, Config.elementsForXMLID)
    writeXML(noIDs.doc, relpath + "ISic001174_tokenized_with_ids_js.xml")

    const idElems = withIDs.textElems.elems
    const noIDElems = noIDs.textElems.elems

    assert.strictEqual(idElems.length, noIDElems.length)

    Arr.zip(idElems, noIDElems).forEach(([pyepidocID, jsID]) => {
        assert.strictEqual(pyepidocID.xmlid, jsID.xmlid)
    });

})