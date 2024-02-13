import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc } from "../../utils/xml.mjs"

import { ISicElementIDError } from "../../../src/Pure/errors.js"

const epidocFp = "./tests/SideEffects/epidoc/files/input/ISic000001_invalid.xml"


test("Load and read invalid EpiDoc file with error", (t) => {
    assert.throws(() => {
        const epidoc = loadEpiDoc(epidocFp)
        epidoc.assertTEINameAndNS()    
    }, ISicElementIDError)
})