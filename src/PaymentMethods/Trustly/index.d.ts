import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Trustly extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const trustly: () => Trustly;
export default trustly;
