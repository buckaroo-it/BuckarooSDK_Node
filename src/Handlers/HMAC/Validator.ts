import { Hmac } from './Hmac';
import { Config } from '../../Config/Config';
import { HmacSHA256 } from 'crypto-js';

class Validator extends Hmac {
    protected config: Config;
    protected hash!: string;

    constructor(config: Config) {
        super();
        this.config = config;
    }

    public validate(header: string, uri: string, method: string, data: any) {
        const headerArray = header.split(':');

        const providedHash = headerArray[1];

        this.setUri(uri);
        this.setNonce(headerArray[2]);
        this.setTime(headerArray[3]);

        this.setBase64Data(data);

        const hmac =
            this.config.getWebsiteKey() +
            method +
            this.getUri() +
            this.getTime() +
            this.getNonce() +
            this.getBase64Data();

        this.hash = HmacSHA256('sha256', this.config.getSecretKey()).update(hmac).digest('base64');

        return providedHash === this.hash;
    }

    public validateOrFail(header: string, uri: string, method: string, data: any) {
        if (this.validate(header, uri, method, data)) {
            return true;
        }
        throw new Error('HMAC validation failed.');
    }
}
