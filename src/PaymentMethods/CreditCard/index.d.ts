import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Creditcard extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payEncrypted(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payWithSecurityCode(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorizeWithSecurityCode(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorizeEncrypted(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancelAuthorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    capture(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payrecurrent(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const creditcard: () => Creditcard;
export default creditcard;
