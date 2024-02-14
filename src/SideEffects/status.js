import Attrs from "./attrs.js"
import Elems from "./elems.js"
import { InvalidModeError } from "../Errors/mode.js"

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

        // This should never happen
        throw new InvalidModeError(`Invalid selection mode`)
    }
}
