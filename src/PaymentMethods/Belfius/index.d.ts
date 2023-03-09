import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Belfius extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const belfius: () => Belfius;
export default belfius;
