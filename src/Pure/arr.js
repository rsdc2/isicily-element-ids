const Arr = {
    /**
     * @template T
     * @param {Array.<T>} arr 
     * @returns {T | null}
     */
    last : arr => {
        if (arr.length === 0) {
            return null
        } else {
            return arr.reverse()[0]
        }
    } 
}