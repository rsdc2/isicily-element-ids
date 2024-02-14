import { FileError } from "../Errors/file.js"

export default class FileValidator {

    /**
     * Assert that the file extension is included 
     * in the list exts containing expected file extensions
     * @param {File} file 
     * @param {Array.<string>} exts 
     * @returns {boolean}
     */
    static assertFileExt (file, exts) {
        const fileExt = "." + file.name.split(".").reverse()[0]
        if (fileExt == null) {
            throw new FileError("File does not have extension")
        }

        if (!exts.includes(fileExt)) {
            throw new FileError(
                `File extension ${fileExt} is not of the required type ` +
                `${exts.join(" or ")}`
            )
        }

        return true
    }

    /**
     * 
     * @param {File} file 
     * @param {number} maxfilesize maximum file size in KB
     * @returns {boolean} 
     */
    static assertSize (file, maxfilesize) {
        if (file.size > maxfilesize * 1000) {
            throw new FileError(
                `File size is too large. File must be below ${maxfilesize} KB`
            )
        }

        return true
    }
}