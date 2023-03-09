import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Payment extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload?: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const payment: () => Payment;
export default payment;
