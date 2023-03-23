import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Buckaroowallet extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    deposit(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    reserve(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    withdrawal(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancel(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    create(): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    update(): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    getInfo(): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    release(): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const buckaroowallet: () => Buckaroowallet;
export default buckaroowallet;
