
import { Arr } from "./arr.js"

import "../Types/typedefs.js"


/**
 * 
 * @param {string} s1 
 * @param {string} s2
 * @return {number} 
 */
function sameLength(s1, s2) {
    const zipped = Arr.zip(Array.from(s1), Array.from(s2));

    let sum = 0;

    zipped.forEach(([char1, char2]) => {
        if (char1 !== char2) {
            sum = sum + 1
        }
    });

    return sum;

}

/**
 * 
 * @param {StringPair} stringPair
 * @returns {number} 
 */

// export function editDistance([s1, s2]) {


//     if (s1 === s2) {
//         return 0
//     }

//     if (s1.length === 0 && s2.length !== 0) {
//         return s2.length
//     }

//     if (s1.length !== 0 && s2.length === 0) {
//         return s1.length
//     }

//     if (s1.length === s2.length) {
//         return sameLength(s1, s2)        
//     }

//     const lengthDiff = s1.length - s2.length
    
//     const arr1D = new Array(s1.length + 1)
    

//     const dist = arr1D.map(
//         (elem) => {
//             const arr = new Array(s2.length + 1)
//             arr.map( elem => elem = 0)
//             elem = arr
//         }
//     )

//     for (let i=0; i<=s1.length; i++) {
//         dist[i][0] = i
//     }

//     for (let j=0; j<=s1.length; j++) {
//         dist[j][0] = j
//     }

    
// }


/**
 * Find the distance to the nearest zero to the right 
 * or below
 * @param {number[][]} arr2d 
 * @param {[number, number]} start
 * @returns {[number, number] | null}
 */
export function findClosestZero(arr2d, [startX, startY]) {

    const zeroCoords = Arr.find2d(arr2d, 0, [startX, startY])
    const maxX = arr2d.length
    if (maxX === 0) {
        return null
    }
    const maxY = arr2d[0].length

    const closest = /** @type {[number, number]} */ (zeroCoords.reduce (
        /**
         * 
         * @param {[number, number]} closest
         * @param {[number, number]} zeroXY
         * @returns {[number, number]}
         */
        ([closestX, closestY], [zeroX, zeroY]) => {
            const [distX, distY] = Arr.subtract2d([zeroX, zeroY], [startX, startY])
            const [distAccX, distAccY] = Arr.subtract2d([closestX, closestY], [startX, startY])
            if (distX < 0 || distY < 0) {
                return [closestX, closestY]
            }

            if (distX + distY < distAccX + distAccY) {
                return [zeroX, zeroY]
            }
            return [zeroX, zeroY]
        }, [maxX, maxY]
    ))
 
    const [closestX, closestY] = closest
    if (closestX === maxX && closestY === maxY) {
        return null
    }

    return closest
}


/**
 * 
 * @param {[string, string]} param0 
 */
export function editDistance([s1, s2]) {

    if (s1 === s2) {
        return 0
    }

    if (s1.length === 0 && s2.length !== 0) {
        return s2.length
    }

    if (s1.length !== 0 && s2.length === 0) {
        return s1.length
    }

    if (s1.length === s2.length) {
        return sameLength(s1, s2)        
    }

    const s1Arr = Array.from(s1)
    const s2Arr = Array.from(s2)
    const s1Len = s1.length
    const s2Len = s2.length

    /**
     * 
     * @param {[string[], string[]]} param0 
     * @returns {number[][]}
     */ 
    function getDistances([s1, s2]) {

        const arr = Arr.arr2d([s1Len, s2Len], 0)

        // console.log(arr)
        
        for (let i=0; i<s1Len; i++) {
            for (let j=0; j<s2Len; j++) {
                arr[i][j] = s1[i] == s2[j] ? 0 : 1

            }
        }

        return arr

    }



    const dists = getDistances([s1Arr, s2Arr])    

    let i = 0, j = 0;
    let cost = 0;

    // console.log("x: ", s2Len, ", y: ", s1Len)
    // console.log(dists)
    // console.log(i, j, cost)

    while (i < s1Len && j < s2Len) {

        cost += dists[i][j]

        const r = i + 1 === s1Len ? null : dists[i + 1][j]
        const b = j + 1 === s2Len ? null : dists[i][j + 1]
        const d = r == null || b == null ? null : dists[i + 1][j + 1]

        const thisS1Letter = s1Arr[i]
        const thisS2Letter = s2Arr[j]

        if (r == null && b == null && d == null) {
            break
        }

        if (r === 0) {

            const rS1Letter = s1Arr[i + 1]    
            if (rS1Letter == thisS1Letter) {
                cost += 1
            }
            
            i = i + 1
            // console.log(i, j, cost, r, b, d)
            continue
        } 

        if (b === 0) {
            const bS2Letter = s2Arr[j + 1]

            if (bS2Letter == thisS2Letter) {
                cost += 1
            }
    
            j = j + 1
            // console.log(i, j, cost, r, b, d)
            continue
        }

        if (d === 0) {
            i = i + 1
            j = j + 1
            // console.log(i, j, cost, r, b, d)
            continue
        }

        // const closestZero = findClosestZero(dists, [i, j])

        // if (closestZero === null) {
        //     cost 
        // }

        if (d != null) {
            i = i + 1
            j = j + 1
            // console.log(i, j, cost, r, b, d)
            continue
        }

        if (b == null) {
            i = i + 1
            // console.log(i, j, cost, r, b, d)
            continue
        }

        if (r == null) {
            j = j + 1
            // console.log(i, j, cost, r, b, d)
            continue
        }

        throw new Error("Don't know what to do")
    }

    return cost
}