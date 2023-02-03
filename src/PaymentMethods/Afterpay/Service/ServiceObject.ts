export default class ServiceObject {
  constructor(data) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey];
    }
  }
}
