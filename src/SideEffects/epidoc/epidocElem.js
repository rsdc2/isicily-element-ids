import HasXMLElem from "../xml/hasxmlelem.js"

export default class EpiDocElem extends HasXMLElem {

    /**
     * 
     * @param {Element} elem 
     */
    constructor(elem) {
        super(elem)
    }

    get ancestorAb() {
        const abs = this.ancestors.filter( elem => 
            elem.localName === "ab" )
        if (abs.length === 0) {
            return null
        }
        return abs[0]
    }

    get ancestorEdition() {
        const divs = this.ancestors.filter( elem => {
            return elem.localName === "div" && 
                elem.getAttribute("type") === "edition"
        })

        if (divs.length === 0) {
            return null
        }
        return divs[0]
    }
}