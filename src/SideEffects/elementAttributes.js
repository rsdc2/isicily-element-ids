
const addClasses = 
    (/** @type {Array.<HTMLElement>} */ ...elems) => 
    (/** @type {Array.<string>} */ ...classes) => 
    elems.forEach( elem => elem.classList.add(...classes))


const removeClasses = 
    (/** @type {Array.<HTMLElement>} */ ...elems) => 
    (/** @type {Array.<string>} */ ...classes) => 
    elems.forEach( elem => elem.classList.remove(...classes))

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const activate = (...elems) => elems.forEach( elem => addClasses(elem)("activated"))

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const deactivate = (...elems) => elems.forEach( elem => removeClasses(elem)("activated"))

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const disable = (...elems) => elems.forEach( elem => elem.disabled = true )


/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const enable = (...elems) => elems.forEach( elem => elem.disabled = false )

/**
 * 
 * @param  {...HTMLElement} elems 
 * @returns 
 */

const getActivated = (...elems) => elems.map( elem => hasClass ("activated") (elem)) 

/**
 * 
 */
const hasClass = (/** @type {string} */ className) => (/** @type {HTMLElement} elem */ elem) =>  elem.classList.contains(className)

/**
 * @param {Array.<HTMLElement>} elems
 */
const hide = (...elems) => elems.forEach( elem => addClasses(elem)("hidden") )

const isActivated = (/** @type {HTMLButtonElement}*/ elem) => hasClass("activated")(elem)

/**
 * @param {Array.<HTMLElement>} elems
 */
const show = (...elems) => elems.forEach( elem => removeClasses(elem)("hidden") )