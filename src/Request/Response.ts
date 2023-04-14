import {
    AxiosResponse,
    AxiosResponseHeaders,
    InternalAxiosRequestConfig,
    RawAxiosResponseHeaders
} from 'axios'
import { Hmac } from './Hmac'

export class Response implements AxiosResponse {
    get data(): any {
        return this._data
    }
    protected readonly _data: any
    config: InternalAxiosRequestConfig
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders
    status: number
    statusText: string
    constructor(response: AxiosResponse) {
        this.status = response.status
        this.config = response.config
        this.statusText = response.statusText
        this.headers = response.headers
        this._data = response.data
    }
    static validate(authorizationHeader: string, method: string, url: string, data?: object) {
        let authorization = authorizationHeader.split(':')
        let hmac = new Hmac(method, url, data, authorization[2], authorization[3])
        let hash = hmac.hashData(hmac.getHashString())
        return hash === authorization[1]
    }
}
