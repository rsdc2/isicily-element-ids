/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const disable = (...elems) => elems.forEach( elem => elem.disabled = true )

/**
 * @param {Array.<HTMLButtonElement>} elems 
 */

const enable = (...elems) => elems.forEach( elem => elem.disabled = false )

/**
 * @param {Array.<HTMLElement>} elems
 */
const hide = (...elems) => elems.forEach( elem => elem.hidden = true )

/**
 * @param {Array.<HTMLElement>} elems
 */
const show = (...elems) => elems.forEach( elem => elem.hidden = false )