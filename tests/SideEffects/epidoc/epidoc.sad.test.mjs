import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc } from "../../utils/xml.mjs"

import { ISicElementIDError } from "../../../src/Errors/isicElementIDError.js"

const epidocFp = "./tests/files/input/ISic000001_invalid_ns.xml"


test("Load and read invalid EpiDoc file with error", (t) => {
    assert.throws(() => {
        const epidoc = loadEpiDoc(epidocFp)
        epidoc.assertTEINameAndNS()    
    }, ISicElementIDError)
})