export default class NamedNodeMap_ {

    /**
     * Converts a NamedNodeMap to a Map
     * @param {NamedNodeMap} nodemap 
     * @returns {Map.<string, string>}
     */
    static toMap(nodemap) {
        const map = new Map()
        for (let i=0; i<nodemap.length; i++) {
            const item = nodemap.item(i)
            map.set(item.name, item.value)
        }
        return map
    }
}