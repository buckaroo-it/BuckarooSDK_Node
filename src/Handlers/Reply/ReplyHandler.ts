import crypto from 'crypto';
import { ICredentials } from '../../Utils/Types';
import { Hmac } from '../../Request/Hmac';
import HttpMethods from '../../Constants/HttpMethods';

export class ReplyHandler {
    private readonly _data: object;
    private readonly uri?: string;
    private readonly auth_header?: string;
    private readonly credentials: ICredentials;
    private _isValid: boolean = false;
    private strategy: 'JSON' | 'HTTP' = 'JSON';
    private method?: string;

    constructor(credentials: ICredentials, data: string, auth_header?: string, uri?: string, httpMethod?: string) {
        this._data = this.formatStringData(data);
        this.credentials = credentials;
        this.uri = uri;
        this.auth_header = auth_header;
        this.method = httpMethod;
    }

    isValid(): boolean {
        return this._isValid;
    }

    validate() {
        if (this.strategy === 'HTTP') {
            let { brq_signature, BRQ_SIGNATURE, ...data } = this._data as any;
            this._isValid = this.validateHttp(data, brq_signature || BRQ_SIGNATURE);
            return this;
        }
        if (this.strategy === 'JSON' && this.auth_header && this.uri) {
            this._isValid = this.validateJson(this.auth_header, this.uri, JSON.stringify(this._data));
            return this;
        }
        throw new Error('Invalid response data');
    }

    private formatStringData(value: string) {
        try {
            let data = JSON.parse(value);
            this.strategy = 'JSON';
            return data;
        } catch (e) {
            let objData: Record<string, any> = {};
            new URLSearchParams(value).forEach((value, name) => {
                objData[name] = value;
            });
            this.strategy = 'HTTP';
            return objData;
        }
    }

    private validateJson(auth_header: string, url: string, data: string) {
        return new Hmac().validate(this.credentials, auth_header, url, data, this.method || HttpMethods.POST);
    }

    private validateHttp(data: Record<string, any>, signature: string): boolean {
        const stringData =
            Object.keys(data)
                .map((key) => `${key}=${data[key]}`)
                .join('') + this.credentials.secretKey;
        const hash = crypto.createHash('sha1').update(stringData).digest('hex');

        return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
    }
}
