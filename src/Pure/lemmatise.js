
import { lemmataLatin } from "../Pure/constants/lemmataLatin.js"
import { lemmataGreek } from "../Pure/constants/lemmataGreek.js"
import { comparison } from "../Pure/stringedit.js";

const latinKeys = Object.keys(lemmataLatin)
const greekKeys = Object.keys(lemmataGreek)


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
            if (latinKeys.includes(word)) {
                return lemmataLatin[word]
            } else {
                latinKeys.reduce (
                    
                )
            }
        } else if (lang === "grc") {
            if (greekKeys.includes(word)) {
                return lemmataGreek[word]
            } else {

            }
        } 
} 