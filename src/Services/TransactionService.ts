import { Request } from "../Request";
import { HttpMethods, RequestTypes } from "../Constants";
import { TransactionResponse } from "../Models";

export default class TransactionService {
    private readonly _key: string;

    constructor(key: string) {
        this._key = key;
    }

    status() {
        return new Request(`${RequestTypes.Transaction}/Status/${this._key}`, HttpMethods.GET, undefined, TransactionResponse).request();
    }

    refundInfo() {
        return new Request(`${RequestTypes.Transaction}/RefundInfo/${this._key}`, HttpMethods.GET).request();
    }

    cancelInfo() {
        return new Request(`${RequestTypes.Transaction}/Cancel/${this._key}`, HttpMethods.GET).request();
    }
}
