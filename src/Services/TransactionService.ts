import { Request } from '../Request';
import Buckaroo from '../buckaroo';
import { HttpMethods, RequestTypes } from '../Constants';
import { TransactionResponse } from '../Models';

export default class TransactionService {
    private readonly _key: string;

    constructor(key: string, private readonly client: Buckaroo = Buckaroo.Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
        this._key = key;
    }

    status() {
        return new Request(
            `${RequestTypes.Transaction}/Status/${this._key}`,
            HttpMethods.GET,
            undefined,
            TransactionResponse,
            this.client
        ).request();
    }

    refundInfo() {
        return new Request(
            `${RequestTypes.Transaction}/RefundInfo/${this._key}`,
            HttpMethods.GET,
            undefined,
            undefined,
            this.client
        ).request();
    }

    cancelInfo() {
        return new Request(
            `${RequestTypes.Transaction}/Cancel/${this._key}`,
            HttpMethods.GET,
            undefined,
            undefined,
            this.client
        ).request();
    }
}
