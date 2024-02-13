import { test } from "node:test"
import assert from "node:assert/strict"

import { loadEpiDoc } from "../../utils/file.mjs"
import { ISicElementIDError } from "../../../src/Pure/errors.js"

const epidocFp = "./tests/SideEffects/epidoc/files/input/ISic000001_valid.xml"


test("Load and read valid EpiDoc file without error", (t) => {
    assert.doesNotThrow(() => {
        const epidoc = loadEpiDoc(epidocFp)
        epidoc.assertTEINameAndNS()
    }, ISicElementIDError)
})