import FilePicker from "./filepicker.js"
import FileDownloader from "./filedownloader.js"
import FileReader_ from "./filereader_.js"
import Convert from "../Pure/convert.js"
import Base from "../Pure/base.js"
import Message from "./message.js"
import Constants from "../Pure/constants.js"


export default class CSVConverter {
    #picker 
    #reader

    /**
     * 
     * @param {string} filename 
     */
    constructor(filename) {

        // Set up reader
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        this.#reader = new FileReader_(
            (e) => {
                const contents = /** @type {string} */ (e.target.result) // String because will use readAsText method to read
                try {
                    const conversion = this.#convertFromStr(contents)
                    const downloader = new FileDownloader(conversion)
                    downloader.download(filename)  
                } catch (Error) {
                    Message.alert(`${Error.message}`)
                }  
            }
        )

        // Set up picker
        this.#picker = new FilePicker ( 
            (e) => {
                const target = /** @type {HTMLInputElement} */ (e.target)
                const files = target.files
                this.#reader.readAsText(files[0])
                this.#picker.remove()
            }, [".csv"]
        )
        
        this.#picker.load()
    }
 
    /**
     * Convert a string containing a sequence of 
     * IDs in a given base (52 or 100), to be converted.
     * The first line gives the original base.
     * The second line gives the new base.
     * @param {string} fileStr 
     */
    #convertFromStr(fileStr) {
        const lines = fileStr.split("\n").reduce( 
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
            throw new Error(`CSV file does not contain enough lines: the ` +
                            `file has ${lines.length} lines of data, but ` +
                            `at least 3 are needed`)
        }

        // Check has one column
        lines.forEach( line => {
            const lineSplit = line.split(",")
            if (line.split(",").length > 1) {
                throw new Error(`File contains ${lineSplit.length} columns: ` +
                                `there should be 1`)
            }
        })

        const oldBaseIdx = /** @type{"52"|"100"} */ (lines[0])
        const newBaseIdx = /** @type{"52"|"100"} */ (lines[1])

        if (!Constants.VALIDBASES.includes(oldBaseIdx)) {
            throw new Error(`Old base invalid: ${oldBaseIdx}`)
        }
        if (!Constants.VALIDBASES.includes(newBaseIdx)) {
            throw new Error(`New base invalid: ${newBaseIdx}`)
        }

        const ids = lines.slice(2)

        // Do the conversion
        const convertedLines = ids.map (
            (id) => {
                return `${id},${
                    Convert.ID(Base.fromBaseIdx(oldBaseIdx), 
                    Base.fromBaseIdx(newBaseIdx))(id)
                }`
            }
        ) 

        // Add the headings
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
            return new CSVConverter(filename) 
        }
        return inner
    }
}