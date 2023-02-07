export default class Model{
    setKeys(keys) {
        for (let dataKey in this) {
            if (keys[dataKey]) {
                this[keys[dataKey]] = this[dataKey];
                delete this[dataKey];
            }
        }
    }
}