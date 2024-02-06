import FilePicker from "./filepicker.js"
import FileDownloader from "./filedownloader.js"
import FileReader_ from "./filereader_.js"
import Convert from "../Pure/convert.js"
import Base from "../Pure/base.js"
import Message from "./message.js"
import { 
    BaseIndexError, 
    BaseLengthError, 
    BaseValueError, 
    ConversionError, 
    CSVFormatError, 
    FileError} from "../Pure/errors.js"
import Constants from "../Pure/constants.js"



export default class XMLIDApplier {
    #picker 
    #reader

    /**
     * Create a new XMLIDApplier instance that applies IDs
     * to tokens in a tokenized EpiDoc XML file.
     * @param {string} filename 
     */
    constructor(filename) {

        // Initialize reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.#reader = new FileReader_(
            (e) => {
                const contents = /** @type {string} */ (e.target.result) 
                // String because will use readAsText method to read
                try {
                    const conversion = this.convertFromCSVStr(contents)
                    const downloader = new FileDownloader(conversion)
                    downloader.download(filename)  
                } catch (error) {
                    if (error instanceof ConversionError) {
                        Message.alert(`${error.message}`)
                    } else if (error instanceof BaseIndexError) {
                        Message.alert(`${error.message}`)
                    } else if (error instanceof CSVFormatError) {
                        Message.alert(`${error.message}`)
                    } else {
                        console.error(error.message)
                        Message.alert(
                            `Unknown error: please refer to the developer console`
                        )
                    }
                }  
            }
        )

        // Initialize file picker
        this.#picker = new FilePicker ( 
            (e) => {
                const target = /** @type {HTMLInputElement} */ (e.target)
                const files = target.files

                try {

                    let file;
                    
                    // Check that there is a file
                    if (files.length === 0) {
                        throw new FileError("No files selected")
                    } else {
                        file = files[0]
                    }

                    // Check the file is not too big
                    if (file.size > Constants.MAXFILESIZE) {
                        throw new FileError(
                            "File size is too big. File must be below 100kb"
                        )
                    } else {
                        this.#reader.readAsText(file)
                        this.#picker.remove()        
                    }

                } catch (error) {
                    if (error instanceof FileError) {
                        Message.alert(error.message)
                    }
                }

            }, [".csv"]
        )
        
        // Show the file picker
        this.#picker.load()
    }
 
    /**
     * Convert a CSV string containing a sequence of 
     * IDs in a given base (52 or 100), to be converted.
     * The first line gives the original base.
     * The second line gives the new base.
     * @param {string} fileStr 
     */
    convertFromCSVStr(fileStr) {
        // Split the string into lines
        const lines = fileStr.split(/\r?\n/).reduce( 
            (lines, line) => {
                if (line === "") {
                    return lines
                }
                lines.push(line)
                return lines
            }, []
        )

        // Check at least 3 lines, two for bases, and one for data
        if (lines.length < 3) {
            throw new CSVFormatError(
                `CSV file does not contain enough lines: the ` +
                `file has ${lines.length} lines of data, but ` +
                `at least 3 are needed`)
        }

        // Check each line has only one column
        lines.forEach( line => {
            const lineSplit = line.split(",")
            if (line.split(",").length > 1) {
                throw new CSVFormatError(
                    `File contains ${lineSplit.length} columns: ` +
                    `there should be 1`
                )
            }
        })

        // Get the first two lines giving the conversion direction

        lines.slice(0, 2).forEach( 
            (line, idx) => {
                if (!Constants.VALIDBASES.includes(line)) {
                    throw new CSVFormatError(
                        `Line ${idx + 1} does not contain a valid ` + 
                        `base index (currently ${line}). ` +
                        `Valid base indices are 52 and 100`
                    )
                }
            }
        )

        const oldBaseIdx = /** @type{"52"|"100"} */ (lines[0])
        const newBaseIdx = /** @type{"52"|"100"} */ (lines[1])

        // Get the ids from the rest of the file
        const ids = lines.slice(2)
        const convert = Convert.ID(
            Base.fromBaseIdx(oldBaseIdx), 
            Base.fromBaseIdx(newBaseIdx)
        )

        // Do the conversion
        const convertedLines = ids.map (
            (id) => {
                try {
                    const converted = convert(id)
                    return `${id},${converted}`
                } catch (error) {
                    if (error instanceof BaseValueError) {
                        return `${id},${error.message}`
                    } 
                    else if (error instanceof BaseLengthError) {
                        return `${id},${error.message}`
                    } 
                    else {
                        throw error
                    }
                } 
            }
        ) 

        // Add headings to the CSV file
        const headings = `${oldBaseIdx},${newBaseIdx}`
        convertedLines.unshift(headings)

        return convertedLines.join("\n")
    }

    /**
     * Create a CSVHandler that downloads a file with a specific filename
     * when called
     * @param {string} filename 
     * @returns 
     */
    static create(filename) {

        function inner() {
            try {
                return new XMLIDApplier(filename) 
            } catch (error) {
                if (error instanceof FileError) {
                    Message.alert(error.message)
                }
            }
        }
        return inner
    }
}