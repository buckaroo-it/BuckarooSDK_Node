import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Przelewy24 extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const przelewy24: () => Przelewy24;
export default przelewy24;
