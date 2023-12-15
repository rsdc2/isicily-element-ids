/**
 * @returns {"compression"|"midpoint"} 
 */
const selectionMode = () => {
    const sel = 
        /** @type {string} */
        operationForm.elements['operation'].value
    if (includes ("compression", "midpoint") (sel)) {
        return sel
    }

    console.error("Invalid selection mode")
}