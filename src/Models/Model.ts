import {Payload} from "./Payload";

export default class Model{
    protected _payload: Payload
    constructor(model: Payload) {
        this._payload = model
    }

    public filter(keys: Array<string>): object {

        return Object.keys(this._payload).filter(key => !keys.includes(key)).reduce((obj, key) => {
            obj[key] = this._payload[key];
            return obj;
        }, {})
    }

}