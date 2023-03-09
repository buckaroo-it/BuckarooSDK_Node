export default class Model {
    protected _data
    constructor(model) {
        this._data = model
    }
    public filter(keys: Array<string>): object {
        return Object.keys(this._data)
            .filter((key) => !keys.includes(key))
            .reduce((obj, key) => {
                obj[key] = this._data[key]
                return obj
            }, {})
    }

    public only(keys: Array<string>): object {
        return Object.keys(this._data)
            .filter((key) => keys.includes(key))
            .reduce((obj, key) => {
                obj[key] = this._data[key]
                return obj
            }, {})
    }
}
