import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class SEPA extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payrecurring(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    extrainfo(payload: any): Promise<any>;
}
declare const sepa: () => SEPA;
export default sepa;
