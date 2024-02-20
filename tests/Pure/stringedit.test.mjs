
import Parametrized from "../utils/parametrized.mjs"
import { editDistance } from "../../src/Pure/stringedit.js"


const { parametrize } = Parametrized

const tests = /** @type {[[string, string], number, string][]}*/ (
    [[["abc", "abd"], 1, "abc"]]) 

parametrize(tests, editDistance)