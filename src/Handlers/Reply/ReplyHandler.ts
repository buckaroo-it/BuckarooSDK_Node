import crypto from 'crypto';
import { ICredentials } from '../../Utils';
import { Hmac } from '../../Request';
import { HttpMethods } from '../../Constants';

// Buckaroo only signs brq_, add_ and cust_ fields. The signed string joins them without a separator,
// so a key or value that contains another field could shift where fields start and end.
const SIGNED_KEY = /^(brq|add|cust)_(?!\w*(brq|add|cust)_)\w+$/i;
const EMBEDDED_FIELD = /(brq|add|cust)_\w+=/i;

export class ReplyHandler {
    private readonly _data: object;
    private readonly uri?: string;
    private readonly auth_header?: string;
    private readonly credentials: ICredentials;
    private _isValid: boolean = false;
    private strategy: 'JSON' | 'HTTP' = 'JSON';
    private method?: string;
    private hasDuplicateKeys: boolean = false;

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

    // The validated fields, or undefined when the push is not valid. Read push values from here, not from your own parse of the body.
    data(): Record<string, any> | undefined {
        return this._isValid ? { ...this._data } : undefined;
    }

    validate() {
        if (this.strategy === 'HTTP') {
            this._isValid = !this.hasDuplicateKeys && this.validateHttp(this._data);
            return this;
        }
        this._isValid =
            !!this.auth_header &&
            !!this.uri &&
            this.validateJson(this.auth_header, this.uri, JSON.stringify(this._data));
        return this;
    }

    private formatStringData(value: string) {
        try {
            let data = JSON.parse(value);
            this.strategy = 'JSON';
            return data;
        } catch (e) {
            const fields = Array.from(new URLSearchParams(value));
            // Shops may read the first value or ignore key case, so any repeated name is ambiguous.
            this.hasDuplicateKeys = new Set(fields.map(([name]) => name.toLowerCase())).size !== fields.length;
            this.strategy = 'HTTP';
            return Object.fromEntries(fields);
        }
    }

    private validateJson(auth_header: string, url: string, data: string) {
        return new Hmac().validate(this.credentials, auth_header, url, data, this.method || HttpMethods.POST);
    }

    private validateHttp(data: Record<string, any>): boolean {
        const signatureKey = Object.keys(data).find((key) => key.toLowerCase() === 'brq_signature');
        const signature = signatureKey ? String(data[signatureKey]).trim() : '';
        const keys = Object.keys(data).filter((key) => key !== signatureKey);
        // Buckaroo signs the fields sorted case-insensitively; sorting also fixes where each field sits in the string.
        const stringData =
            keys
                .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
                .map((key) => `${key}=${data[key]}`)
                .join('') + this.credentials.secretKey;
        const hash = Buffer.from(crypto.createHash('sha1').update(stringData).digest('hex'));
        const provided = Buffer.from(signature);
        if (provided.length !== hash.length || !crypto.timingSafeEqual(hash, provided)) {
            return false;
        }

        // Checked after the signature so unsigned requests can't make the regexes do heavy work.
        return keys.every((key) => SIGNED_KEY.test(key) && !EMBEDDED_FIELD.test(String(data[key])));
    }
}
