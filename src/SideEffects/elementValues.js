import * as Elements from "./elements"
import * as Attrs from "./elementAttributes"
/**
 * @returns {"compression"|"midpoint"} 
 */
export const selectionMode = () => {

    if (Attrs.isActivated(Elements.compressBtn) && !Attrs.isActivated(Elements.midPointBtn)) {
        return "compression"
    } else if (Attrs.isActivated(Elements.midPointBtn) && !Attrs.isActivated(Elements.compressBtn)) {
        return "midpoint"
    }

    console.error("Invalid selection mode")
}