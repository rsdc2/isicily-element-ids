import { IDCarrier } from "./Pure/constants/elemTypes.js"

export const Config = {
    /**
     * An array of strings with the localNames of the
     * elements within <ab/> that should receive
     * an \@xml:id
     */
    elementsForXMLID: Object.values(IDCarrier)
    // elementsForXMLID: ["w"]
}