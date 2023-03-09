import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Buckaroowallet extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    deposit(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    reserve(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    withdrawal(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancel(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    create(payload: any): Promise<any>;
    update(payload: any): Promise<any>;
    getinfo(payload: any): Promise<any>;
    release(payload: any): Promise<any>;
}
declare const buckaroowallet: () => Buckaroowallet;
export default buckaroowallet;
