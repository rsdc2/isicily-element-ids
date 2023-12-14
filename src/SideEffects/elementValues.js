/**
 * @returns {"compression"|"midpoint"} 
 */
const selectionMode = () => {
    const sel = 
        /** @type {string} */
        operationForm.elements['operation'].value
    if (["compression", "midpoint"].includes(sel)) {
        return sel
    }

    console.error("Invalid selection mode")
}