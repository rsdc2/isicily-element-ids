import { test } from "node:test"
import assert from "node:assert/strict"

import Str from "../src/Pure/str.js"


test ("string to upper case", (t) => {
    assert.strictEqual(Str.toUpper("x"), "X")
})

