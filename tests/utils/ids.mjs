import assert from "node:assert/strict"

import { Arr } from "../../src/Pure/arr.js";
import TextElem from "../../src/SideEffects/epidoc/textElem.js";

/**
 * Asserts that the sets of ids are the same length,
 * and that the items are equal
 * @param {TextElem[]} ids1
 * @param {TextElem[]} ids2 
 */
export function assertIDsEqual(ids1, ids2) {
    assert.strictEqual(ids1.length, ids2.length)

    Arr.zip(ids1, ids2).forEach(([pyepidocID, jsID]) => {
        assert.strictEqual(
            pyepidocID.xmlid, 
            jsID.xmlid, 
            `${pyepidocID} is not equal to ${jsID}`)
    });
}