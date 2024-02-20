import { test } from "node:test"
import assert from "node:assert/strict"
import Parametrized from "../utils/parametrized.mjs"

const { parametrize } = Parametrized
import { lemmatise } from "../../src/Pure/lemmatise.js"

const lemmatiseLatinTests = /** @type {[string, string, string][]}*/ (
    [
        ["Dis", "Deus", "Lemmatise 'Dis'"],
        ["Manibus", "Manes", "Lemmatise 'Manes'"]
    ]
)

parametrize(lemmatiseLatinTests, lemmatise("la"))
