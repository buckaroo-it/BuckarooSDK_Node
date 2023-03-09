import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Banktransfer extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const banktransfer: () => Banktransfer;
export default banktransfer;
