/**
 * @class State
 * @module State
 */
class State {
  /**
   * Create a State
   *
   * @class
   */
  constructor () {
    this.values = new Map();
  }

  /**
   * Add a key, value pair
   *
   * @function add
   * @param {any} key - Key of pair
   * @param {any} value - Value of pair
   */
  add (key, value) {
    this.values.set(key, value);
  }

  /**
   * Remove key from State
   *
   * @function remove
   * @param {any} key - Key to remove from State
   * @returns {any|null} Returns the removed key or null
   */
  remove (key) {
    let value = null;

    if (this.has(key)) {
      value = this.values.get(key);
      this.values.delete(key);
    }
    return value;
  }

  /**
   * Update key, value pair
   *
   * @function update
   * @param {any} key - Key to update
   * @param {any} value - Value to update
   */
  update (key, value) {
    this.add(key, value);
  }

  /**
   * Check if key exists in Map
   *
   * @function has
   * @param {any} key - Key to check
   * @returns {boolean} If the State has a key
   */
  has (key) {
    return this.values.has(key);
  }

  /**
   * Get value based on value or null
   *
   * @function get
   * @param {any} key - Key to check
   * @returns {any|null} Value matching key or null
   */
  get (key) {
    let value = null;

    if (this.has(key)) {
      value = this.values.get(key);
    }

    return value;
  }

  /**
   * Return the size of the Map
   *
   * @function size
   * @returns {number} Size of Map
   */
  size () {
    return this.values.size;
  }
}

export default State;
