import {TransactionResponse} from "../Models/TransactionResponse";

export class BuckarooError extends Error {
    private code: string;
    constructor(res:TransactionResponse) {
        super();
        this.message = res.getErrorMessages().join('\n ') || res.getErrorMessage();
        this.code = res.getStatusCode();
    }
}