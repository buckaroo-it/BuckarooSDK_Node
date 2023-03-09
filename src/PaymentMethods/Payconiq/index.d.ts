import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Payconiq extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const payconiq: () => Payconiq;
export default payconiq;
