import Format from "../Pure/format.js"

export default class Elem {
    /**
     * 
     * @param {Element} elem 
     * @returns {Element}
     */
    static clear (elem) {
        elem.textContent = ""
        Array.from(elem.children).forEach ( child => elem.removeChild(child) )
        return elem
    }

    /**
     * Formats the text content of a <div> element
     * so that Greek text is emphasized
     * @param {HTMLDivElement | HTMLSpanElement} div 
     * @returns {HTMLDivElement | HTMLSpanElement}
     */
    static highlightGreekInDiv (div) {
        const resultSpan = Format.highlightGreekFromStr(div.textContent)
        Elem.clear(div)

        if (resultSpan.textContent !== "") {
            div.appendChild(resultSpan)
        }
        return div
    }
}