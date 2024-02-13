import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc, writeXML } from "../../utils/file.mjs"
import { assertIDsEqual } from "../../utils/ids.mjs"

import { Arr } from "../../../src/Pure/arr.js"
import { NullIDError } from "../../../src/SideEffects/epidoc/errors.js"
import Base from "../../../src/Pure/base.js"
import Constants from "../../../src/Pure/constants/constants.js"
import { Config } from "../../../src/config.js"

const {BASE100, BASE52} = Constants
const base100 = Base.fromBaseChars(BASE100)
const inputpath = "./tests/SideEffects/epidoc/files/input/"
const outputpath = "./tests/SideEffects/epidoc/files/output/"


/**
 * 
 * @param {string} filename 
 * @returns {string}
 */
function getInputPath(filename) {
    return inputpath + filename
}

/**
 * 
 * @param {string} filename 
 * @returns {string}
 */
function getOutputPath(filename) {
    return outputpath + filename
}


test("Put an @xml:id on all text elements", (t) => {
    const epidoc = loadEpiDoc(getInputPath("ISic000001_valid.xml"))
    
    assert.doesNotThrow(() => {
        epidoc.textElems.assertNoIDs()
    }, NullIDError)

    epidoc.textElems.setXMLIDs(base100, epidoc.id)

    assert.doesNotThrow(() => {
        epidoc.textElems.assertAllElementsHaveID()
    }, NullIDError)
})


test("Put an @xml:id on element subset", (t) => {
    const epidoc = loadEpiDoc(getInputPath("ISic000001_valid.xml"))
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
    const withIDs = loadEpiDoc(getInputPath("ISic001174_tokenized_with_ids_pyepidoc.xml"))
    const noIDs = loadEpiDoc(getInputPath("ISic001174_tokenized_without_ids.xml"))
    
    noIDs.textElems.setXMLIDs(base100, noIDs.id, Config.elementsForXMLID)
    writeXML(noIDs.doc, outputpath + "ISic001174_tokenized_with_ids_js.xml")

    assertIDsEqual(withIDs.textElems.elems, noIDs.textElems.elems)
})


test("Check puts midpoints in correctly", (t) => {
    const missingMidpoints = loadEpiDoc(
        getInputPath("ISic000001_tokenized_with_ids_pyepidoc_midpoint.xml")
    )

    missingMidpoints.textElems.assertMissingIDs()
    missingMidpoints.textElems.setMidpointXMLIDs(base100)

    const benchmark = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))

    assertIDsEqual(missingMidpoints.textElems.elems, benchmark.textElems.elems)
})