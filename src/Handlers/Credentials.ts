import { ICredentials } from '../Utils';
import Buckaroo from '../buckaroo';
import { Request } from '../Request';
import { RequestTypes } from '../Constants';
import { bindClient, clientFor } from '../Request/ClientBinding';

export class Credentials implements ICredentials {
    secretKey: string;
    websiteKey: string;

    constructor(secretKey: string, websiteKey: string, client: Buckaroo = Buckaroo.Client) {
        if (!secretKey || !websiteKey) throw new Error('Missing required credentials.');

        bindClient(this, client);
        this.secretKey = secretKey;
        this.websiteKey = websiteKey;
    }

    confirm() {
        return bindClient(
            Request.Specification(RequestTypes.Transaction, {
                name: 'ideal',
                version: 2,
            }),
            clientFor(this),
            this
        )
            .request()
            .then((response) => {
                return response.httpResponse.status === 200;
            })
            .catch(() => {
                return false;
            });
    }
}
