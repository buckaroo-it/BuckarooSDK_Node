import { Hmac } from './Hmac';
import { Config } from '../../Config/Config';
import { HmacSHA256 } from 'crypto-js';

class Generator extends Hmac {
    protected config: Config;
    protected method: string;
    protected hash!: string;

    constructor(config: Config, data: any, uri: string, method: string = 'POST') {
        super();
        this.config = config;
        this.method = method;

        this.setBase64Data(data);
        this.setUri(uri);
        this.setNonce('nonce_' + Math.floor(Math.random() * 9999999 + 1));
        this.setTime(String(Date.now()));
    }

    public generate() {
        const hashString =
            this.config.getWebsiteKey +
            this.method +
            this.getUri() +
            this.getTime() +
            this.getNonce() +
            this.getBase64Data();
        this.hash = HmacSHA256.createHmac('sha256', this.config.getSecretKey())
            .update(hashString)
            .digest('base64');
        return `${this.config.getWebsiteKey()}:${this.hash}:${this.getNonce()}:${this.getTime()}`;
    }
}
