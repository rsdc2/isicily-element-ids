import { test } from "node:test"
import assert from "node:assert/strict"
import Parametrized from "../utils/parametrized.mjs"

const { parametrize } = Parametrized
import { lemmatise } from "../../src/Pure/lemmatise.js"

import { comparison } from "../../src/Pure/stringedit.js"

const lemmatiseLatinTests = /** @type {[string, string, string][]}*/ (
    [
        ["Dis", "Deus", "Lemmatise 'Dis'"],
        ["Manibus", "Manes", "Lemmatise 'Manes'"],
        ["Deum", "Deus", "Lemmatise 'Deum'"]
    ]
)

parametrize(lemmatiseLatinTests, lemmatise("la"))

const lemmatiseGreekTests = /** @type {[string, string, string][]}*/ (
    [
        ["ἀνδρὶ", "ἀνήρ", "Lemmatise 'ἀνδρὶ'"]
    ]
)


parametrize(lemmatiseGreekTests, lemmatise("grc"))


// const comparisonTests = /** @type {[string, string, string][]} */ (
//     [
//         ["Deum"]
//     ]
// )