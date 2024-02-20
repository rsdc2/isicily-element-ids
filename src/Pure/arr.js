import { ArrayLengthError } from "../Errors/pure.js"

export const Arr = {
    
    /**
     * @template T
     * @param {[number, number]} dims
     * @param {T} def
     * @returns {T[][]}
     */
    arr2d: ([x, y], def) => {
        const arr1d = new Array(x)

        for (let i = 0; i < x; i++) {
            
            const arr = new Array(y)
            for (let j = 0; j < y; j++) {
                arr[j] = def
            }
            arr1d[i] = arr

        }

        return arr1d
    },

    /**
     * @template T
     * @param {T[][]} arr2d
     * @param {[number, number]} start 
     * @returns {T[][]}
     */

    bottomRightQuadrant: (arr2d, [startX, startY]) => {
        const arr2d_ = Arr.copy2d(arr2d)

        const right = arr2d_.slice(startX)
        const bottomRight = right.reduce(
            /**
             * 
             * @param {T[][]} rows 
             * @param {T[]} row 
             * @returns 
             */
            (rows, row) => {
                const row_ = row.slice(startY)
                rows.push(row_)
                return rows
            }
        , [])

        return bottomRight
        
        // const rightPart = arr2d.slice(startX)
        // const bottomRightQuadrant = rightPart.forEach(
        //     row => row = row.copy(startY)
        // )


        // return arr2d.reduce(
        //     (rows, row, i) => {
        //         if (i >= startX) {
                    
        //             const newRow = row.reduce(
        //                 (col, item, j) => {
        //                     if (j >= startY) {
        //                         col.push(item)
        //                     }
        //                     return col
        //                 }
        //             , [])
        //             rows.push(newRow)
        //         }

        //         return rows
        //     }
        // , [])

    },

    /**
     * @template T
     * @param {T[][]} arr2d
     * @returns {T[][]} 
     */
    copy2d: (arr2d) => {
        // const newArr = Arr.arr2d([arr2d.length, arr2d[0].length], 0)

        return arr2d.map ( (elem, i) => {
            return elem.map (
                (item, j) => {
                    return arr2d[i][j]
                }
            )
        })
        
        // return newArr_
    },

    /**
     * Tests all the elements of a 2d array to 
     * see if they are equal
     * @template T
     * @param {T[][]} arr1 
     * @param {T[][]} arr2
     * @returns {boolean} 
     */
    eq2d: (arr1, arr2) => {

        if (arr1.length !== arr2.length) {
            return false
        }

        for (let i=0; i<arr1.length; i++) {

            if (arr1[i].length !== arr2[i].length) {
                return false
            }

            for (let j=0; j<arr1[0].length; j++) {
                if (arr1[i][j] !== arr2[i][j]) {
                    return false
                }
            }
        }

        return true
    },

    /**
     * @template T
     * @param {T[][]} arr 
     * @param {T} toFind 
     * @param {[number, number]} [start = [0, 0]]
     */
    find2d: (arr, toFind, [startX, startY] = [0, 0]) => {
        const coords = /** @type {[number, number][]} */ ([])

        for (let i=startX; i<arr.length; i++) {

            for (let j=startY; j<arr[0].length; j++) {
                if (arr[i][j] === toFind) {
                    coords.push([i, j])
                }
            }
        }        

        return coords
    },

    /**
     * Convert a string     to an array of characters
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
     * Subtract arr2 from arr1
     * @param {[number, number]} arr1
     * @param {[number, number]} arr2 
     */
    subtract2d: ([x1, y1], [x2, y2]) => {
        return [x1 - x2, y1 - y2]
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
