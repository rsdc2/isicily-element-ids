import { ArrayLengthError } from "./errors.js"

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
            return [...arr].reverse()[0]
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
    fromString: (s) => {
        let arr = []

        for (let i = 0; i < s.length; i++) {
            arr = arr.concat([s[i]])
        }

        return arr
    },

    /**
     * Zip together two arrays. Throw ArrayLengthError if arrays
     * are of different lengths
     * @template T
     * @param {Array.<T>} arr1 
     * @param {Array.<T>} arr2 
     * @returns {Array.<[T, T]>}
     */
    zip: (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
            throw new ArrayLengthError("Arrays are of different lengths")
        }

        return arr1.map( (item, idx) => {
            return [item, arr2[idx]]
        })
    }
}
