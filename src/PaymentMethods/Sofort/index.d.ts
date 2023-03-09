import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Sofort extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const sofort: () => Sofort;
export default sofort;
