import { test } from "node:test"
import assert from "node:assert/strict"

import { Arr } from "../src/Pure/arr.js"


test ("Last element of an array", (t) => {
    assert.strictEqual(Arr.last([1, 2, 3]), 3)
})

