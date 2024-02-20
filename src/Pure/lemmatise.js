
import { lemmataLatin } from "../Pure/constants/lemmataLatin.js"
import { lemmataGreek } from "../Pure/constants/lemmataGreek.js"
import { comparison } from "../Pure/stringedit.js";

/**
 * 
 * @param {string} lang 
 */
export const lemmatise = (lang) => 
    /**
     * 
     * @param {string} word 
     * @returns 
     */
    (word) => {
        if (word == null || word === "") {
            return null
        }
        if (lang === "la") {
            if (Object.keys(lemmataLatin).includes(word)) {
                return lemmataLatin[word]
            } else {
                
            }
        } else if (lang === "grc") {
            if (Object.keys(lemmataGreek).includes(word)) {
                return lemmataGreek[word]
            } else {
                
            }
        } 
} 