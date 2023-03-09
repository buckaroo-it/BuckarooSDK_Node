import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Surepay extends PayablePaymentMethod {
    protected _paymentName: string;
    verify(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const surepay: () => Surepay;
export default surepay;
