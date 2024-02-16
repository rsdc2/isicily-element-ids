import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc, writeXML } from "../../utils/xml.mjs"
import { assertIDsEqual } from "../../utils/ids.mjs"
import TextElems from "../../../src/SideEffects/epidoc/textElems.js"

import { NullIDError, UniqueIDError } from "../../../src/Errors/ids.js"
import Base from "../../../src/Pure/base.js"
import Constants from "../../../src/Pure/constants/constants.js"
import { Config } from "../../../src/config.js"

import { getInputPath, getOutputPath } from "../../utils/file.mjs"

const {BASE100, BASE52} = Constants
const base100 = Base.fromBaseChars(BASE100)
const base52 = Base.fromBaseChars(BASE52 )

test("Unique ID assertion throws error when IDs not unique", (t) => {
    const nonUniqueIDsDoc = loadEpiDoc(
        getInputPath(
            "ISic000001_all_ids.xml"
        )
    )

    assert.doesNotThrow(
        () => {
            TextElems.assertIDsUnique(nonUniqueIDsDoc.textElems.elems)
        }, UniqueIDError
    )
})

test("Put an @xml:id on all text elements", (t) => {
    const epidoc = loadEpiDoc(getInputPath("ISic000001_valid_no_ids.xml"))
    
    assert.doesNotThrow(() => {
        epidoc.textElems.assertNoIDs()
    }, NullIDError)

    epidoc.textElems.setXMLIDs(base100, epidoc.id)

    assert.doesNotThrow(() => {
        epidoc.textElems.assertAllElementsHaveID()
    }, NullIDError)
})


test("Put an @xml:id on element subset", (t) => {
    const epidoc = loadEpiDoc(getInputPath("ISic000001_valid_no_ids.xml"))
    const elems = epidoc.textElems
    
    assert.doesNotThrow(() => {
        elems.assertNoIDs()
    }, NullIDError)

    elems.setXMLIDs(base100, epidoc.id, ["w"])

    const lbs = elems.subset(["lb"])
    const ws = elems.subset(["w"])
    assert.strictEqual(lbs[0].xmlID, null)
    assert.notStrictEqual(ws[0].xmlID, null)
})




test("IDs are the same as those assigned by PyEpiDoc", (t) => {
    const withIDs = loadEpiDoc(getInputPath("ISic001174_tokenized_with_ids_pyepidoc.xml"))
    const noIDs = loadEpiDoc(getInputPath("ISic001174_tokenized_without_ids.xml"))
    
    noIDs.textElems.setXMLIDs(base100, noIDs.id, Config.elementsForXMLID)
    writeXML(noIDs.doc, getOutputPath("ISic001174_tokenized_with_ids_js.xml"))

    assertIDsEqual(withIDs.textElems.elems, noIDs.textElems.elems)
})


test("Puts midpoints in correctly", (t) => {
    const missingMidpoints = loadEpiDoc(
        getInputPath("ISic000001_tokenized_with_ids_pyepidoc_missing_midpoints.xml")
    )

    assert.throws(() => 
        missingMidpoints.textElems.assertAllElementsHaveID(), NullIDError
    )

    missingMidpoints.textElems.setMidpointXMLIDs(base100)
    const benchmark = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))

    assertIDsEqual(missingMidpoints.textElems.elems, benchmark.textElems.elems)
})


test("Put midpoints on only subset of elements", (t) => {
    const epidoc = loadEpiDoc(
        getInputPath(
            "ISic000001_tokenized_with_ids_pyepidoc_missing_midpoints.xml"
            )
        )

    const tokensForIDs = ["w", "name", "num", "lb"]

    epidoc.textElems.setMidpointXMLIDs(base100, tokensForIDs)

    const elemSubset = epidoc.textElems.subset(tokensForIDs)

    elemSubset.forEach( elem => {
        assert.notStrictEqual(
            elem.xmlID, 
            null, 
            "Element that should have been given an @xml:id has null @xml:id"
        )
    })

    const elemDisjoint = epidoc.textElems.disjoint(tokensForIDs)

    elemDisjoint.forEach( elem => {
        assert.strictEqual(
            elem.xmlID, 
            null, 
            "Element that should not have been given an @xml:id has been given an @xml:id"
        )
    })
}) 


test("Remove IDs correctly", (t) => {
    const doc = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))
    doc.textElems.assertAllElementsHaveID()
    doc.textElems.removeXMLIDs()
    doc.textElems.assertNoIDs()
})

test("Roundtrip conversion IDs correctly", (t) => {
    const origDoc = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))

    const convertedDoc = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))
    
    convertedDoc.textElems
        .convertXMLIDs(base100, base52)
        .convertXMLIDs(base52, base100)

    const origElems = origDoc.textElems.elems
    const convertedElems = convertedDoc.textElems.elems
    
    TextElems.assertNoNullIDs(convertedElems)

    assertIDsEqual(origElems, convertedElems)
    
})