import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Buckaroovoucher extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    getBalance(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    deactivatevoucher(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    createApplication(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const buckaroovoucher: () => Buckaroovoucher;
export default buckaroovoucher;
