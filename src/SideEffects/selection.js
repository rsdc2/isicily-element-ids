/**
 * 
 * @param {HTMLDivElement} elem 
 */

const setCaretEnd = elem => {
    const selection = document.getSelection()
    const rng = document.createRange()
    const descText = XML.xpath("descendant::text()", elem)
    const lastText = Arr.last(descText)
    if (lastText) {
        rng.setStart(lastText, lastText.textContent.length)
        rng.collapse(false)
        selection.removeAllRanges()
        selection.addRange(rng)
    }
    
}

const setCaretAfterNewChar = elem => {

}