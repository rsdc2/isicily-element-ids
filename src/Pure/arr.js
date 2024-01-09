export const Arr = {
    /**
     * Return the last element of an array, or null if the array is empty
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
    },

    /**
     * @template T
     * @param  {...T} arr 
     * @returns 
     */
    includes: 
        (...arr) => 
        (/** @type {T} */ item) => {

            return arr.includes(item)
    },


    /**
     * Convert a string to an array of characters
     * @param {string} s
     * @returns {Array.<string>}
     */
    strToArr: (s) => {
        let arr = []

        for (let i = 0; i < s.length; i++) {
            arr = arr.concat([s[i]])
        }

        return arr
    }
}