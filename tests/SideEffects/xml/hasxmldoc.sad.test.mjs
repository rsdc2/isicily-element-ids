import { test } from "node:test"
import assert from "node:assert/strict"

import { getInputPath, getOutputPath } from "../../utils/file.mjs";
import { XMLDeclarationError } from "../../../src/SideEffects/xml/errors.js";
import { loadEpiDoc } from "../../utils/xml.mjs";


test("Generates error if XML declaration already exists", (t) => {
    const epidoc = loadEpiDoc(getInputPath("ISic000001_all_ids.xml"))
    epidoc.createXMLDeclaration({throwOnFail: true})

    assert.throws( () => {
        epidoc.createXMLDeclaration({throwOnFail: true})
    }, XMLDeclarationError)
})