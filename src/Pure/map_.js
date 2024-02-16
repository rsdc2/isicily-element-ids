import NamedNodeMap_ from "./namednodemap_.js"


/**
 * Classes for handling interactions between map-like objects
 * esp. Map, Object and NamedNodeMap
 */
export class Map_ {

    /**
     * 
     * @param {NamedNodeMap} nodemap 
     * @returns {Map}
     */
    static fromNamedNodeMap(nodemap) {
        return NamedNodeMap_.toMap(nodemap)
    }

    // /**
    //  * 
    //  * @param {object} obj 
    //  */
    // static fromObject(obj) {
    //     const keys = 
    // }
    

}