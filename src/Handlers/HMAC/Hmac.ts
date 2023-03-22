import { HmacSHA256 } from 'crypto-js';

export abstract class Hmac {
    private uri: string;
    private base64Data: string;
    private nonce: string;
    private time: string;

    constructor() {
        this.uri = '';
        this.base64Data = '';
        this.nonce = '';
        this.time = '';
    }

    public setUri(uri?: string) {
        if (uri) {
            uri = uri.replace(/^[^:/.]*[:/]+/i, '');
            this.uri = encodeURIComponent(uri.toLowerCase());
        }
    }

    public getUri() {
        return this.uri;
    }

    public setBase64Data(data?: any) {
        this.base64Data = '';
        if (data) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            const md5 = HmacSHA256.MD5(data);
            this.base64Data = md5.toString('base64');
        }
    }

    public getBase64Data() {
        return this.base64Data;
    }

    public setNonce(nonce?: string) {
        if (nonce) {
            this.nonce = nonce;
        }
    }

    public getNonce() {
        return this.nonce;
    }

    public setTime(time?: string) {
        if (time) {
            this.time = time;
        }
    }

    public getTime() {
        return this.time;
    }
}
