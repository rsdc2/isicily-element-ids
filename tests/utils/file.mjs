const inputpath = "./tests/SideEffects/epidoc/files/input/"
const outputpath = "./tests/SideEffects/epidoc/files/output/"


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