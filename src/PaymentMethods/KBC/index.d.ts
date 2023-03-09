import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class KBC extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const kbc: () => KBC;
export default kbc;
