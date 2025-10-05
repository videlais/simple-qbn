/**
 * @class State
 * @module State
 */
export default class State {
  private _values: Record<string, any>;

  /**
   * @function constructor
   */
  constructor() {
    // Create internal object.
    this._values = {};
  }

  /**
   * Returns internal object.
   *
   * @property {Record<string, any>} keys - Object of internal entries.
   * @returns {Record<string, any>} - Object of entries.
   */
  get keys(): Record<string, any> {
    return this._values;
  }

  /**
   * Set a key, value pair.
   *
   * @function set
   * @param {string} key - Key of pair
   * @param {any} value - Value of pair
   */
  set(key: string, value: any): void {
    this._values[key] = value;
  }

  /**
   * Get a value based on key.
   *
   * @function get
   * @param {string} key - Key of pair
   * @returns {any} value - Value of pair
   */
  get(key: string): any {
    let result = null;

    if (this.exists(key)) {
      result = this._values[key];
    }

    return result;
  }

  /**
   * Delete key from State.
   *
   * @function delete
   * @param {string} key - Key to remove from State
   * @returns {any|null} Returns the removed key or null
   */
  delete(key: string): any {
    let result = null;

    if (this.exists(key)) {
      result = this.get(key);
      delete this._values[key];
    }

    return result;
  }

  /**
   * Check if key exists in State.
   *
   * @function exists
   * @param {string} key - Key to check
   * @returns {boolean} If the State has a key
   */
  exists(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._values, key);
  }

  /**
   * Return the size (number of keys) of the internal object.
   *
   * @function size
   * @returns {number} Returns number of keys
   */
  size(): number {
    return Object.keys(this._values).length;
  }
}