import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
declare class ApplePay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const applepay: () => ApplePay;
export default applepay;
