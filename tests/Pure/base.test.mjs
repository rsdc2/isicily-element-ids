import Parametrized from "../utils/parametrized.mjs"
import { randomISicID, randomTuples } from "../utils/random.mjs"

import Base from "../../src/Pure/base.js"
import Constants from "../../src/Pure/constants.js"

const parametrize = Parametrized.parametrize 

/** @type{Array.<[string, string, string]>} */
const conversions = [
    ["AAKAB", "AADkR", "First token id"]
]

// parametrize(conversions, Base.convert(new Base(Constants.BASE100), new Base(Constants.BASE52)))