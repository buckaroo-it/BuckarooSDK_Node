import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Creditclick extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const creditclick: () => Creditclick;
export default creditclick;
