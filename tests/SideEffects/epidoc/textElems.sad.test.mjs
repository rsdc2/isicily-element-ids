import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc, writeXML } from "../../utils/xml.mjs"
import { assertIDsEqual } from "../../utils/ids.mjs"

import { MidpointIDError, NullIDError } from "../../../src/SideEffects/epidoc/errors.js"
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


test("Throw error when not enough free midpoints", (t) => {
    const missingMidpoints = loadEpiDoc(
        getInputPath(
            "ISic000001_not_enough_free_midpoints.xml"
        )
    )

    missingMidpoints.textElems.assertMissingIDs()

    assert.throws( () => {
        missingMidpoints.textElems.setMidpointXMLIDs(base100)
    }, MidpointIDError)

})