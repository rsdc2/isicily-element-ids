import Elems from "../../SideEffects/elems.js"



const titles = new Map(
[
    ["compress-btn", "Compress or decompress an I.Sicily element ID"],

    ["compress-xml-id-btn", "Load a tokenized EpiDoc XML file containing expanded IDs " + 
                            "and download a new file with the IDs compressed"],

    ["convert-new-xml-ids-btn", "Load an XML file with Base 100 IDs and download a new XML " +
                            "file with the IDs converted to Base 52"],

    ["convert-old-ids-btn", "Load a CSV file with IDs and download a CSV " +
                            "file with the conversions. The first two lines " +
                            "must specify the indices of the bases to be " +
                            "converted from and to respectively"],

    ["convert-old-xml-ids-btn", "Load an XML file with Base 52 IDs and download a new XML " +
                            "file with the IDs converted to Base 100"],
     
    ["expand-xml-id-btn", "Load a tokenized EpiDoc XML file containing IDs " +
                            "and download a new file with the IDs expanded"],

    ["flip-btn", "Swap positions of the compressed / decompressed IDs"],

    ["lemmatize-file-btn", "Load an EpiDoc file and download a version with " +
                                "lemmata added on token elements"],

    ["midpoint-btn", "Find the ID at the midpoint between two IDs"],
    
    ["remove-all-xml-id-btn", "Load a tokenized EpiDoc XML file with IDs and " +
                            "remove @xml,id from all text elements"],
    
    ["set-xml-id-btn", "Load a tokenized EpiDoc XML file and download " +
                        "a new file with IDs on all the edition text " +
                        "elements"],

    ["set-midpoint-xml-id-btn", "Load a tokenized EpiDoc XML file where " +
                            "not all edition elements have IDs and download " +
                            "a new file where the missing IDs have been " +
                            "filled in" 
    ]
])

export function setTitles() {
    const keys = Array.from(titles.keys())
    keys.forEach( id => {
        const btn = Elems.button("#".concat(id))
        const title = titles.get(id)
        btn.title = title
    })
}