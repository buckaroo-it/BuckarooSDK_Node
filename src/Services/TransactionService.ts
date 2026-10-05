import { Request } from '../Request';
import Buckaroo from '../buckaroo';
import { bindClient, clientFor } from '../Request/ClientBinding';
import { HttpMethods, RequestTypes } from '../Constants';
import { TransactionResponse } from '../Models';

export default class TransactionService {
    private readonly _key: string;

    constructor(key: string, client: Buckaroo = Buckaroo.Client) {
        bindClient(this, client);
        this._key = key;
    }

    status() {
        return new Request(
            `${RequestTypes.Transaction}/Status/${this._key}`,
            HttpMethods.GET,
            undefined,
            TransactionResponse,
            clientFor(this)
        ).request();
    }

    refundInfo() {
        return new Request(
            `${RequestTypes.Transaction}/RefundInfo/${this._key}`,
            HttpMethods.GET,
            undefined,
            undefined,
            clientFor(this)
        ).request();
    }

    cancelInfo() {
        return new Request(
            `${RequestTypes.Transaction}/Cancel/${this._key}`,
            HttpMethods.GET,
            undefined,
            undefined,
            clientFor(this)
        ).request();
    }
}
