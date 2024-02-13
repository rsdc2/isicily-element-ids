import { test } from "node:test"
import assert from "node:assert/strict"

import { getInputPath, getOutputPath } from "../../utils/file.mjs";
import { loadEpiDoc } from "../../utils/xml.mjs";


test("Generates an XML declaration", (t) => {
    const epidoc = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))

    assert.strictEqual(epidoc.XMLDeclaration, null)
    epidoc.createXMLDeclaration({throwOnFail: true})
    assert.notStrictEqual(epidoc.XMLDeclaration, null)
})