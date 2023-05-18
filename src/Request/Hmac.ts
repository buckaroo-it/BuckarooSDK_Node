import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import HttpMethods from '../Constants/HttpMethods'
import {ICredentials} from "../Utils/Types";

export class Hmac {
    data: string | object
    url: URL
    nonce: string
    time: string
    method: string
    constructor(
        method: HttpMethods,
        url: URL,
        data: string | object = '',
        nonce?: string,
        time?: string
    ) {
        this.method = method
        this.url = url
        this.data = data
        this.nonce = nonce || ''
        this.time = time || ''
    }
    setNonce(nonce?:string):void {
        this.nonce = nonce? nonce : 'nonce_' + Math.floor(Math.random() * 9999999 + 1)
    }
    setTime(time?:Date):string {
        return time?
            String(Math.round(Date.parse(time.toISOString()) / 1000)):
            String(Math.round(Date.now() / 1000))
    }
    createHmacHeader(credentials: ICredentials):string {
        this.setNonce()
        this.setTime()
        return this.getHmacHeader(credentials.websiteKey, credentials.secretKey)
    }
    getUrlFormat() {
        let urlFormatted =  ''
        if (this.url instanceof URL) {
            urlFormatted = this.url.host + this.url.pathname + this.url.search
            urlFormatted = urlFormatted.replace(/^[^:/.]*[:/]+/i, '')
            urlFormatted = encodeURIComponent(urlFormatted).toLowerCase() || ''
            return urlFormatted
        }
        throw new Error('Url is not a string or URL object')
    }
    getBase64Data() {
        let base64Data = this.data
        if (this.data) {
            if (typeof base64Data === 'object') {
                base64Data = JSON.stringify(base64Data)
            }
            base64Data = Base64.stringify(md5(base64Data))
        }
        return base64Data
    }
    hashData(hashString: string,secretKey:string) {
        return Base64.stringify(hmacSHA256(hashString, secretKey))
    }
    getHashString(websiteKey:string) {
        return (
            websiteKey +
            this.method +
            this.getUrlFormat() +
            this.time +
            this.nonce +
            this.getBase64Data()
        )
    }
    getHmacHeader(websiteKey:string,secretKey:string) {
        let hashString = this.getHashString(websiteKey)

        return (
            `hmac ` +
            `${websiteKey}:${this.hashData(hashString,secretKey)}:${
                this.nonce
            }:${this.time}`
        )
    }
}
