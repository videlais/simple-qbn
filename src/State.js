import mingo from 'mingo'

/**
 * @class State
 * @module State
 */
export default class State {
  /**
     * @function constructor
     */
  constructor () {
    // Create internal object.
    this._values = {}
  }

  /**
     *  Returns internal object.
     *
     * @property {number} keys - Number of internal entries.
     * @returns {number} - Number of entries.
     */
  get keys () {
    return this._values
  }

  /**
     * Set a key, value pair.
     *
     * @function change
     * @param {string} key - Key of pair
     * @param {any} value - Value of pair
     */
  set (key, value) {
    this._values[key] = value
  }

  /**
     * Get a value based on key.
     *
     * @function change
     * @param {string} key - Key of pair
     * @returns {any} value - Value of pair
     */
  get (key) {
    let result = null

    if (this.exists(key)) {
      result = this._values[key]
    }

    return result
  }

  /**
     * Delete key from State.
     *
     * @function remove
     * @param {any} key - Key to remove from State
     * @returns {any|null} Returns the removed key or null
     */
  delete (key) {
    let result = null

    if (this.exists(key)) {
      result = this.get(key)
      delete this._values[key]
    }

    return result
  }

  /**
     * Check if key exists in State.
     *
     * @function exists
     * @param {any} key - Key to check
     * @returns {boolean} If the State has a key
     */
  exists (key) {
    const query = new mingo.Query({ [key]: { $exists: true } })
    return query.test(this._values)
  }

  /**
     * Return the size (number of keys) of the internal object.
     *
     * @function size
     * @returns {number} Returns number of keys
     */
  size () {
    return Object.keys(this._values).length
  }
}
