
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

    /**
     * 
     * @param {BaseValue} valueToAdd 
     * @returns 
     */
    addBase(valueToAdd) {
        const newVal = this.dec + valueToAdd.dec
        return BaseValue.fromDec(Number(newVal), this.#base)
    }

    get base() {
        return this.#base
    }

    get baseStr() {
        return this.#baseValue
    }

    get dec() {
        return this.#base.toDec(this.#baseValue)
    }

    /**
     * Return a new BaseValue from a number input
     * @param {number} dec 
     * @param {Base} base
     * @returns {BaseValue}
     */
    static fromDec(dec, base) {
        return new BaseValue(base.toBase(dec), base)
    }

    /**
     * 
     * @param {BaseValue} valueToSubtract 
     */
    subtract(valueToSubtract) {
        const newVal = this.dec - valueToSubtract.dec
        return BaseValue.fromDec(Number(newVal), this.#base)
    }
}