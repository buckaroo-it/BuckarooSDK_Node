import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class ApplePay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const applepay: () => ApplePay;
export default applepay;
