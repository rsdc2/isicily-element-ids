/**
 * Harness for converting an array of compressed IDs
 */

import Base from "../../src/Pure/base.js"
import Constants from "../../src/Pure/constants.js"
import Compress from "../../src/Pure/compress.js"

const { BASE52, BASE100 } = Constants

const base52 = Base.fromBaseChars(BASE52)
const base100 = Base.fromBaseChars(BASE100)

console.log(Compress.convertIDs(base100, base52)(['abcdα']))