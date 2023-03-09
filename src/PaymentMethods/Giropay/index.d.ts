import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Giropay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const giropay: () => Giropay;
export default giropay;
