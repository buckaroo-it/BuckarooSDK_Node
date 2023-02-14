export default class Model {
  constructor() {
  }
  setParameters (data) {
    /** Go through model to check which parameter to set,
     * delete if optional with no value,
     * rewrite if new data is set,
     * throw error if missing required parameter
     * and ignore function parameters
     */

    for (const key in this) {
      if (!data[key]) {
        if (typeof this[key] !== 'undefined') {
          if (!this[key]) {
            throw new Error('Missing Parameter:' + key + ' in ' + this.constructor.name)
          }
        } else {
          delete this[key]
        }
      } else if (typeof this[key] !== 'function') {
        this[key] = this[key] || data[key]
      }
    }
  }

  setKeys (keys: Record<string, string>) {
    /** Go through keys and change names in model if it exists **/
    for (const thisKey in keys) {
      if (this[thisKey]) {
        delete Object.assign(this, { [keys[thisKey]]: this[thisKey] })[thisKey]
      }
    }
  }
}
