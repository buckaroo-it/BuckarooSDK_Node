import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import HttpMethods from '../Constants/HttpMethods'

export class Hmac {
    data: string | object
    url: string
    nonce: string
    time: string
    method: string
    constructor(
        method: HttpMethods,
        url: string ,
        data: string | object,
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
    createHeader(websiteKey:string,secretKey:string) {
        this.setNonce()
        this.setTime()
        return this.getHmacHeader(websiteKey, secretKey)
    }
    getUrlFormat() {
        let urlFormatted: URL | string = new URL('https://'+this.url)
        if (this.url) {
            urlFormatted = urlFormatted.host + urlFormatted.pathname + urlFormatted.search
            urlFormatted = this.url.replace(/^[^:/.]*[:/]+/i, '')
            urlFormatted = encodeURIComponent(urlFormatted).toLowerCase() || ''
        }
        return urlFormatted
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
