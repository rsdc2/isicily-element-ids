
/**
 * @callback fileReaderOnLoad
 * @param {ProgressEvent<FileReader>} e
 */

/**
 * Factory function for FileReader, that 
 * returns a new FileReader with onload already
 * set
 * @param {fileReaderOnLoad} onloadFunc
 * @returns {FileReader}
 */
export function newFileReader(onloadFunc) {
    const reader = new FileReader()
    // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    reader.onload = onloadFunc
    return reader
}