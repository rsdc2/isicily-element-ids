const inputpath = "./tests/files/input/"
const outputpath = "./tests/files/output/"


/**
 * 
 * @param {string} filename 
 * @returns {string}
 */
export function getInputPath(filename) {
    return inputpath + filename
}

/**
 * 
 * @param {string} filename 
 * @returns {string}
 */
export function getOutputPath(filename) {
    return outputpath + filename
}