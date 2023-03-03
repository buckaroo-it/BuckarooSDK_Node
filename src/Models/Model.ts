//
// export default class Model{
//     protected _payload
//     constructor(model) {
//         this._payload = model
//     }
//     public filter(keys: Array<string>): object {
//         return Object.keys(this._payload).filter(key => !keys.includes(key)).reduce((obj, key) => {
//             obj[key] = this._payload[key];
//             return obj;
//         }, {})
//
//     }
//
//     public only(keys: Array<string>): object {
//         return Object.keys(this._payload).filter(key => keys.includes(key)).reduce((obj, key) => {
//             obj[key] = this._payload[key];
//             return obj;
//         }, {})
//     }
// }
