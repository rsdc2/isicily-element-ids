
import { lemmataLatin } from "../Pure/constants/lemmataLatin.js"
import { lemmataGreek } from "../Pure/constants/lemmataGreek.js"
import { comparison } from "../Pure/stringedit.js";

const latinForms = Object.keys(lemmataLatin)
const greekForms = Object.keys(lemmataGreek)


/**
 * 
 * @param {string} lang 
 */
export const lemmatise = (lang) => 
    /**
     * 
     * @param {string} form 
     * @returns 
     */
    (form) => {
        if (form == null || form === "") {
            return null
        }
        if (lang === "la") {
            if (latinForms.includes(form)) {
                return lemmataLatin[form]
            } else {
                const editDists = latinForms.map(
                    /**
                     * 
                     * @param {string} latinForm 
                     * @returns {[string, number]}
                     */
                    latinForm => [latinForm, comparison([form, latinForm])]
                )
                
                const sorted = editDists.sort( ( [form1, dist1], [form2, dist2]) => dist1 - dist2 )
                const [closestForm, dist] = sorted[0]
                return lemmataLatin[closestForm]
            }


        } else if (lang === "grc") {
            if (greekForms.includes(form)) {
                return lemmataGreek[form]
            } else {
                const editDists = greekForms.map(
                    /**
                     * 
                     * @param {string} greekForm 
                     * @returns {[string, number]}
                     */
                    greekForm => [greekForm, comparison([form, greekForm])]
                )
                
                const sorted = editDists.sort( ( [form1, dist1], [form2, dist2]) => dist1 - dist2 )
                const [closestForm, dist] = sorted[0]
                return lemmataGreek[closestForm]
            }
        } 
} 