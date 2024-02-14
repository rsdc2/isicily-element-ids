import { test } from "node:test"
import assert from "node:assert/strict"
import { loadEpiDoc, writeXML } from "../../utils/xml.mjs"
import { assertIDsEqual } from "../../utils/ids.mjs"
import TextElems from "../../../src/SideEffects/epidoc/textElems.js"

import { 
    MidpointIDError, 
    UnexpectedIDError, 
    UniqueIDError
} from "../../../src/Errors/ids.js"
import Base from "../../../src/Pure/base.js"
import Constants from "../../../src/Pure/constants/constants.js"
import { Config } from "../../../src/config.js"

const {BASE100, BASE52} = Constants
const base100 = Base.fromBaseChars(BASE100)

import { getInputPath, getOutputPath } from "../../utils/file.mjs"

test("Unique ID assertion throws error when IDs not unique", (t) => {
    const nonUniqueIDsDoc = loadEpiDoc(
        getInputPath(
            "ISic000001_nonunique_ids.xml"
        )
    )

    const elems = nonUniqueIDsDoc.textElems.elems.filter(
        elem => elem.xmlid != null
    )

    assert.throws(
        () => {
            TextElems.assertIDsUnique(elems)
        }, UniqueIDError
    )
})


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


test("Throw error when tries to assign IDs to file that already " +
        "has IDs on elements outside the localName subset", (t) => {

        const missingMidpoints = loadEpiDoc(
            getInputPath(
                "ISic000001_missing_midpoints_ids_on_elems_outside_subset.xml"
            )
        )

        assert.throws( () => {
            missingMidpoints.textElems.setMidpointXMLIDs(base100, ["w", "lb", "name", "num"])
        }, UnexpectedIDError)

    }
)