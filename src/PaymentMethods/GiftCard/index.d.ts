import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Giftcard extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const giftcard: () => Giftcard;
export default giftcard;
