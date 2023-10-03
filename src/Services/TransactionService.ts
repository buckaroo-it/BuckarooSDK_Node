import Request from '../Request/Request'
import HttpMethods from '../Constants/HttpMethods'
import { TransactionResponse } from '../Models/Response/TransactionResponse'
import { RequestTypes } from '../Constants/Endpoints'

export default class TransactionService {
    private readonly _key: string
    constructor(key: string) {
        this._key = key
    }
    status() {
        return new Request(
            `${RequestTypes.Transaction}/Status/${this._key}`,
            HttpMethods.GET,
            undefined,
            TransactionResponse
        ).request()
    }
    refundInfo() {
        return new Request(
            `${RequestTypes.Transaction}/RefundInfo/${this._key}`,
            HttpMethods.GET
        ).request()
    }
    cancelInfo() {
        return new Request(
            `${RequestTypes.Transaction}/Cancel/${this._key}`,
            HttpMethods.GET
        ).request()
    }
}
