
export const addClasses = 
    (/** @type {Array.<HTMLElement>} */ ...elems) => 
    (/** @type {Array.<string>} */ ...classes) => 
    elems.forEach( elem => elem.classList.add(...classes))


export const removeClasses = 
    (/** @type {Array.<HTMLElement>} */ ...elems) => 
    (/** @type {Array.<string>} */ ...classes) => 
    elems.forEach( elem => elem.classList.remove(...classes))

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

export const activate = (...elems) => elems.forEach( elem => addClasses(elem)("activated"))

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

export const deactivate = (...elems) => elems.forEach( elem => removeClasses(elem)("activated"))

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

export const disable = (...elems) => elems.forEach( elem => elem.disabled = true )


/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

export const enable = (...elems) => elems.forEach( elem => elem.disabled = false )

/**
 * 
 * @param  {...HTMLElement} elems 
 * @returns 
 */

export const getActivated = (...elems) => elems.map( elem => hasClass ("activated") (elem)) 

/**
 * 
 */
export const hasClass = (/** @type {string} */ className) => (/** @type {HTMLElement} elem */ elem) =>  elem.classList.contains(className)

/**
 * @param {Array.<HTMLElement>} elems
 */
export const hide = (...elems) => elems.forEach( elem => addClasses(elem)("hidden") )

export const isActivated = (/** @type {HTMLButtonElement}*/ elem) => hasClass("activated")(elem)

/**
 * @param {Array.<HTMLElement>} elems
 */
export const show = (...elems) => elems.forEach( elem => removeClasses(elem)("hidden") )