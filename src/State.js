/*
  State is a Map of key-value pairs.
*/
export default class State {
  constructor () {
    this.values = new Map();
  }

  // Add a new key-value pair
  add (key, value) {
    this.values.set(key, value);
  }

  // Remove a value based on its key
  // Returns the removed key or null
  remove (key) {
    let value = null;

    if (this.has(key)) {
      value = this.values.get(key);
      this.values.delete(key);
    }
    return value;
  }

  // Update a value based on its key
  update (key, value) {
    this.add(key, value);
  }

  // Check if key exists in Map
  has (key) {
    return this.values.has(key);
  }

  // Get value based on value or null
  get (key) {
    let value = null;

    if (this.has(key)) {
      value = this.values.get(key);
    }

    return value;
  }

  // Return the size of the Map
  size () {
    return this.values.size;
  }
}
