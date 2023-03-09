import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Afterpay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload?: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancelAuthorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    capture(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const afterpay: () => Afterpay;
export default afterpay;
