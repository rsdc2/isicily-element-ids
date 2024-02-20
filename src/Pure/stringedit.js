
import { Arr } from "./arr.js"

import "../Types/typedefs.js"

/**
 * 
 * @param {StringPair} stringPair
 * @returns {number} 
 */

export function editDistance([s1, s2]) {

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

    const lengthDiff = s1.length - s2.length
    
    

}