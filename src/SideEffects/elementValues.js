/**
 * @returns {"compression"|"midpoint"} 
 */
const selectionMode = () => {

    if (isActivated(compressBtn) && !isActivated(midPointBtn)) {
        return "compression"
    } else if (isActivated(midPointBtn) && !isActivated(compressBtn)) {
        return "midpoint"
    }

    console.error("Invalid selection mode")
}