import { ICredentials } from '../Utils';
import { Request } from '../Request';
import { RequestTypes } from '../Constants';

export class Credentials implements ICredentials {
    secretKey: string;
    websiteKey: string;

    constructor(secretKey: string, websiteKey: string) {
        if (!secretKey || !websiteKey) throw new Error('Missing required credentials.');

        this.secretKey = secretKey;
        this.websiteKey = websiteKey;
    }

    confirm() {
        return Request.Specification(RequestTypes.Transaction, {
            name: 'ideal',
            version: 2,
        })
            .request()
            .then((response) => {
                return response.httpResponse.status === 200;
            })
            .catch(() => {
                return false;
            });
    }
}
