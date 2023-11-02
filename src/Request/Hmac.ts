import { ICredentials } from '../Utils';
import md5 from 'crypto-js/md5';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto';

export class Hmac {
    protected _data?: object;
    protected _url?: URL;
    protected _nonce?: string;
    protected _time?: string;
    protected _method?: string;

    get data(): string {
        return this._data ? JSON.stringify(this._data) : '';
    }

    set data(data: string) {
        try {
            let jsonData = JSON.parse(data);
            if (Object.keys(jsonData).length > 0) {
                this._data = jsonData;
            }
        } catch (e) {}
    }

    get url(): string | undefined {
        return this._url
            ? encodeURIComponent(
                  this._url.href
                      .replace(this._url.protocol, '')
                      .replace(/^[^:/.]*[:/]+/i, '')
                      .replace(/(^\w+:|^)\/\//, '')
              ).toLowerCase()
            : undefined;
    }

    set url(url: string | undefined) {
        if (url) this._url = new URL(url);
    }

    get nonce(): string {
        return this._nonce || 'nonce_' + Math.floor(Math.random() * 9999999 + 1);
    }

    set nonce(nonce: string) {
        this._nonce = nonce;
    }

    get time(): string {
        return this._time || String(Math.round(Date.now() / 1000));
    }

    set time(time: string) {
        this._time = time;
    }

    get method(): string {
        return this._method || 'POST';
    }

    set method(method: string) {
        this._method = method;
    }

    get base64Data() {
        if (this._data) {
            return Base64.stringify(md5(this.data));
        }
        return '';
    }

    generate(credentials: ICredentials, nonce?: string, time?: string): string {
        this._nonce = nonce || this.nonce;
        this._time = time || this.time;
        let hashString = this.getHashString(credentials.websiteKey);
        let hashData = this.hashData(hashString, credentials.secretKey);
        return `hmac ${credentials.websiteKey}:${hashData}:${this._nonce}:${this._time}`;
    }

    validate(credentials: ICredentials, authHeader: string, url: string, data: string, method: string): boolean {
        let header = authHeader.split(':');
        let providedHash = header[1];
        this.nonce = header[2];
        this.time = header[3];
        this.method = method;
        this.url = url;
        this.data = data;
        let hash = this.hashData(this.getHashString(credentials.websiteKey), credentials.secretKey);
        return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(providedHash));
    }

    protected getHashString(websiteKey: string) {
        return websiteKey + this.method + this.url + this.time + this.nonce + this.base64Data;
    }

    protected hashData(hashString: string, secretKey: string) {
        return hmacSHA256(hashString, secretKey).toString(Base64);
    }
}
