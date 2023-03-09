import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Bancontact extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authenticate(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payOneClick(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payEncrypted(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    completedPayment(): Promise<any>;
    payRecurring(): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const bancontact: () => Bancontact;
export default bancontact;
