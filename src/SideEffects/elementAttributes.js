
export default class Attrs {

    static addClasses = 
    (/** @type {Array.<HTMLElement>} */ ...elems) => 
    (/** @type {Array.<string>} */ ...classes) => 
    elems.forEach( elem => elem.classList.add(...classes))


    static removeClasses = 
        (/** @type {Array.<HTMLElement>} */ ...elems) => 
        (/** @type {Array.<string>} */ ...classes) => 
        elems.forEach( elem => elem.classList.remove(...classes))

    /**
     * @param {Array.<HTMLButtonElement>} elems 
     */

    static activate = (...elems) => elems.forEach( elem => Attrs.addClasses(elem)("activated"))

    /**
     * @param {Array.<HTMLButtonElement>} elems 
     */

    static deactivate = (...elems) => elems.forEach( elem => Attrs.removeClasses(elem)("activated"))

    /**
     * @param {Array.<HTMLButtonElement>} elems 
     */

    static disable = (...elems) => elems.forEach( elem => elem.disabled = true )


    /**
     * @param {Array.<HTMLButtonElement>} elems 
     */

    static enable = (...elems) => elems.forEach( elem => elem.disabled = false )

    /**
     * 
     * @param  {...HTMLElement} elems 
     * @returns 
     */

    static getActivated = (...elems) => elems.map( elem => Attrs.hasClass ("activated") (elem)) 

    /**
     * 
     */
    static hasClass = (/** @type {string} */ className) => (/** @type {HTMLElement} elem */ elem) =>  elem.classList.contains(className)

    /**
     * @param {Array.<HTMLElement>} elems
     */
    static hide = (...elems) => elems.forEach( elem => Attrs.addClasses(elem)("hidden") )

    static isActivated = (/** @type {HTMLButtonElement}*/ elem) => Attrs.hasClass("activated")(elem)

    /**
     * @param {Array.<HTMLElement>} elems
     */
    static show = (...elems) => elems.forEach( elem => Attrs.removeClasses(elem)("hidden") )

}

