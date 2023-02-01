import md5 from 'crypto-js/md5';
import Config from "./config";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
export default class Hmac {
    private uri: string;
    private base64Data: string;
    private nonce: string;
    private time: string;
    private config: Config;
    private hash: string | undefined;

    constructor(config:Config) {
        this.uri = this.setUri('https://testcheckout.buckaroo.nl/json/Transaction');

        this.base64Data = '';
        this.nonce = '';
        this.time = '';
        this.config = config;
        this.setNonce('nonce_' + Math.floor(Math.random() * 9999999 + 1));
        this.setTime(String(Math.round(Date.now() / 1000)));
    }

    public setUri(uri?: string) :string{

        if (uri) {
            uri = uri.replace(/^[^:/.]*[:/]+/i, '');
            return this.uri = encodeURIComponent(uri).toLowerCase();
        }
        return '';
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

            this.base64Data = Base64.stringify(md5(data));
        }
    }

    public generate(method,data) {
        const hashString =
            this.config.getWebsiteKey() +
            method +
            this.getUri() +
            this.getTime() +
            this.getNonce() +
            this.getBase64Data(data);

        this.hash = Base64.stringify(hmacSHA256(hashString, this.config.getSecretKey()));
        return `${this.config.getWebsiteKey()}:${this.hash}:${this.getNonce()}:${this.getTime()}`;
    }

    public getBase64Data(data?) {

        if (data) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);

            }

            this.base64Data = Base64.stringify(md5(data));
        }
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
