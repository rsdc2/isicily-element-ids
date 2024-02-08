
import Base from "./base.js"

/**
 * Class representing a value in a particular Base
 */
export default class BaseValue {
    #baseValue
    #base

    /**
     * 
     * @param {string} value 
     * @param {Base} base 
     */
    constructor(value, base) {
        this.#baseValue = value
        this.#base = base
    }

    /**
     * 
     * @param {number} valueToAdd decimal value to add to the base
     */
    add(valueToAdd) {
        const newVal = this.#base.addDec(valueToAdd, this.#baseValue)
        return new BaseValue(newVal, this.#base)
    }

    get base() {
        return this.#base
    }

    get baseValue() {
        return this.#baseValue
    }

    get decValue() {
        return this.#base.toDec(this.#baseValue)
    }
}