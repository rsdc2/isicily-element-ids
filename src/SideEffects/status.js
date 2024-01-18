import Attrs from "./attrs.js"
import Elems from "./elems.js"

export default class Status {
    /**
     * @returns {"compression"|"midpoint"} 
     */
    static selectionMode = () => {

        if (Attrs.isActivated(Elems.compressBtn) && !Attrs.isActivated(Elems.midPointBtn)) {
            return "compression"
        } else if (Attrs.isActivated(Elems.midPointBtn) && !Attrs.isActivated(Elems.compressBtn)) {
            return "midpoint"
        }

        console.error("Invalid selection mode")
    }
}
