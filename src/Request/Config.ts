import { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import { Hmac } from './Hmac'
import httpMethods from '../Constants/HttpMethods'

export default class RequestConfig implements AxiosRequestConfig {
    headers: RawAxiosRequestHeaders = { ...this.defaultHeaders() }
    method?: httpMethods
    data?
    url?
    defaultHeaders(): RawAxiosRequestHeaders {
        return {
            'Content-type': 'application/json',
            Accept: '/',
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
    setAuthHeader(method, url, data?) {
        this.headers.Authorization = new Hmac(method, url, data).createHeader()
    }
}
