import { Hmac } from './Hmac'
import HttpMethods from "../Constants/HttpMethods";
import {BuckarooClient} from "./BuckarooClient";


export type RequestHeaders = {
    'Content-type'?: string
    Accept?: string
    Culture?: string
    Authorization?: string
    Software?: string
} & { [key: string]: string }

export default class Headers {
    private readonly _headers:RequestHeaders = this.getDefaultHeaders();
    constructor() {
        this.setSoftwareHeader()
    }
    getHeaders():RequestHeaders {
        return this._headers
    }
    getDefaultHeaders() {
        return  {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Culture: 'nl-NL',
            Authorization: ''
        }
    }
    setSoftwareHeader(value:  {
        PlatformName?:string,
        PlatformVersion?:string,
        ModuleSupplier?:string,
        ModuleName?:string,
        ModuleVersion?:string
    } = {}):this {

        this._headers.Software = JSON.stringify({
            PlatformName: 'Node SDK',
            PlatformVersion: '1.0',
            ModuleSupplier: 'Buckaroo',
            ModuleName: 'BuckarooPayments',
            ModuleVersion: '1.0',
            ...value
        })
        return this;
    }
    addHeaders(headers: RequestHeaders) {
        Object.keys(headers).forEach((key) => {
            this._headers[key] = headers[key]
        })
    }
    removeHeaders(headers: RequestHeaders) {
        Object.keys(headers).forEach((key) => {
            delete this._headers[key]
        })
    }
    setAuthHeader(hmacHeader:string):this {
        this._headers.Authorization = hmacHeader
        return this;
    }
}
