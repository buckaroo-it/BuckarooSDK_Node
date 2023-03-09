import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Paypal extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payrecurring(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    extrainfo(payload: any): Promise<any>;
}
declare const paypal: () => Paypal;
export default paypal;
