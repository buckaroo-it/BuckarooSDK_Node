import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Billink extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancelAuthorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    capture(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const billink: () => Billink;
export default billink;
