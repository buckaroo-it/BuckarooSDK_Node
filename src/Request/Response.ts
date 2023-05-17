
import { Hmac } from './Hmac'

export class Response {
    get data(): any {
        return this._data
    }
    protected readonly _data: any
    status: number
    statusText: string
    constructor(response) {
        this.status = response.status
        // this.config = response.config
        this.statusText = response.statusText
        this._data = response.data
    }
    // static validate(authorizationHeader: string, method: string, url: string, data?: object) {
    //     let authorization = authorizationHeader.split(':')
    //     let hmac = new Hmac(method, url, data, authorization[2], authorization[3])
    //     let hash = hmac.hashData(hmac.getHashString())
    //     return hash === authorization[1]
    // }
}
