/**
 * Harness for converting an array of compressed IDs
 */

import Base from "../../src/Pure/base.js"
import Constants from "../../src/Pure/constants/constants.js"

const { BASE52, BASE100 } = Constants

const base52 = Base.fromBaseChars(BASE52)
const base100 = Base.fromBaseChars(BASE100)
