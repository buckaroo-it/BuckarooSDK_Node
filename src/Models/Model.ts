export default class Model {
  setKeys(keys) {
    for (let dataKey in this) {
      if (!this[dataKey]) {
        delete this[dataKey];
      } else if (keys[dataKey]) {
        this[keys[dataKey]] = this[dataKey];
        delete this[dataKey];
      }
    }
  }
}
