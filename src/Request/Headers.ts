import { Hmac } from './Hmac'
import HttpMethods from "../Constants/HttpMethods";
import {ICredentials} from "../Utils/Types";
import {RequestOptions} from "https";

type requestHeaders = {
    'Content-type': string
    Accept: string
    Culture: string
    Authorization: string
}

export default class RequestHeaders {
    private readonly headers:requestHeaders;
    constructor() {
        this.headers = {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Culture: 'nl-NL',
            Authorization: ''
        }
    }
    getHeaders():requestHeaders {
        return this.headers
    }
    setHeaders(headers: requestHeaders) {
        Object.keys(headers).forEach((key) => {
            this.headers[key] = headers[key]
        })
    }
    removeHeaders(headers: requestHeaders) {
        Object.keys(headers).forEach((key) => {
            delete this.headers[key]
        })
    }
    setAuthHeader(options: RequestOptions, data: string, credentials: ICredentials) {
        let method = options.method == HttpMethods.METHOD_POST? HttpMethods.METHOD_POST : HttpMethods.METHOD_GET
        let url = options.host || ''
        if(options.path){
            url += options.path
        }
        this.headers.Authorization = new Hmac(method, url, data).createHeader(credentials.websiteKey, credentials.secretKey)
    }
}
