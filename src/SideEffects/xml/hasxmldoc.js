import HasXMLElem from "./hasxmlelem.js"

/**
 * Services for EpiDoc XML documents
 */
export default class HasXMLDoc {
    #doc

    /**
     * 
     * @param {XMLDocument} doc 
     */
    constructor(doc) {
        this.#doc = doc
    }

    get doc() {
        return this.#doc
    }

    /**
     * @returns {HasXMLElem}
     */
    get root() {
        return new HasXMLElem(this.#doc.documentElement)
    } 


}