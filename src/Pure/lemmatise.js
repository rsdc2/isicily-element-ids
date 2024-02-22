import { lemmataLatin } from "../Pure/constants/lemmataLatin.js"
import { lemmataGreek } from "../Pure/constants/lemmataGreek.js"
import { editDistance } from "../Pure/stringedit.js";

const latinForms = Object.keys(lemmataLatin)
const greekForms = Object.keys(lemmataGreek)
const stringEditThreshold = 1
const formLengthThreshold = 2

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

                if (form.length <= formLengthThreshold) {
                    return null
                }
                const editDists = latinForms.map(
                    /**
                     * 
                     * @param {string} latinForm 
                     * @returns {[string, number]}
                     */
                    latinForm => [latinForm, editDistance([form, latinForm])]
                )
                
                const sorted = editDists.sort( ( [form1, dist1], [form2, dist2]) => dist1 - dist2 )
                const [closestForm, dist] = sorted[0]

                if (dist <= stringEditThreshold) {
                    return lemmataLatin[closestForm]
                } 

                return null

            }


        } else if (lang === "grc") {
            if (greekForms.includes(form)) {
                return lemmataGreek[form]
            } else {
                if (form.length < formLengthThreshold) {
                    return
                }
                const editDists = greekForms.map(
                    /**
                     * 
                     * @param {string} greekForm 
                     * @returns {[string, number]}
                     */
                    greekForm => [greekForm, editDistance([form, greekForm])]
                )
                
                const sorted = editDists.sort( ( [form1, dist1], [form2, dist2]) => dist1 - dist2 )
                const [closestForm, dist] = sorted[0]

                if (dist <= stringEditThreshold) {
                    return lemmataGreek[closestForm]
                }

                return null
            }
        } 
} 