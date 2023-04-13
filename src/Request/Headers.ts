import { RawAxiosRequestHeaders } from 'axios'
import { Hmac } from './Hmac'
export default class RequestHeaders {
    headers: RawAxiosRequestHeaders = {}
    defaultHeaders(): RawAxiosRequestHeaders {
        return {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Culture: 'en-GB'
        }
    }
    addHeaders(headers: RawAxiosRequestHeaders) {
        Object.keys(headers).forEach((key) => {
            this.headers[key] = headers[key]
        })
    }
    removeHeaders(headers: RawAxiosRequestHeaders) {
        Object.keys(headers).forEach((key) => {
            delete this.headers[key]
        })
    }
    setAuthHeader(method:string, url:string, data?:object) {
        this.headers.Authorization = new Hmac(method, url, data).createHeader()
    }
}
