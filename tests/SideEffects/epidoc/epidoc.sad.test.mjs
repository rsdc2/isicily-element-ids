import { JSDOM } from "jsdom"
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

import EpiDoc from "../../../src/SideEffects/epidoc/epidoc.js"
import { ISicElementIDError } from "../../../src/Pure/errors.js"

const epidocFp = "./tests/SideEffects/epidoc/files/ISic000001_invalid.xml"

test("Load and read EpiDoc file with error", (t) => {
    assert.throws(() => {
        const xmlStr = readFileSync(epidocFp, {encoding: "utf8"})
        const xml = new JSDOM(xmlStr, {contentType: "application/xml"}).window.document
        const epidoc = new EpiDoc(xml)
        epidoc.assertTEINameAndNS()    
    }, ISicElementIDError)
})