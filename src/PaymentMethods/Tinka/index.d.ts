import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Tinka extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const tinka: () => Tinka;
export default tinka;
