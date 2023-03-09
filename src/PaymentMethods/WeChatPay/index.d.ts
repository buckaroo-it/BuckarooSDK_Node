import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Wechatpay extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const wechatpay: () => Wechatpay;
export default wechatpay;
