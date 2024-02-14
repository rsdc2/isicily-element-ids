import { test } from "node:test"
import assert from "node:assert/strict"

import { loadEpiDoc } from "../../utils/xml.mjs"
import { ISicElementIDError } from "../../../src/Errors/isicElementIDError.js"

const epidocFp = "./tests/SideEffects/epidoc/files/input/ISic000001_valid_no_ids.xml"


test("Load and read valid EpiDoc file without error", (t) => {
    assert.doesNotThrow(() => {
        const epidoc = loadEpiDoc(epidocFp)
        epidoc.assertTEINameAndNS()
    }, ISicElementIDError)
})