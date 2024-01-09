
/**
 * @returns {"compression"|"midpoint"} 
 */
const selectionMode = () => {

    if (Attrs.isActivated(Elems.compressBtn) && !Attrs.isActivated(Elems.midPointBtn)) {
        return "compression"
    } else if (Attrs.isActivated(Elems.midPointBtn) && !Attrs.isActivated(Elems.compressBtn)) {
        return "midpoint"
    }

    console.error("Invalid selection mode")
}