import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class EPS extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const eps: () => EPS;
export default eps;
