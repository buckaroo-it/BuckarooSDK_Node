import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Payload, RefundPayload } from '../../Models/ITransaction';
interface IPay extends Payload {
    locale: 'en-US' | 'zh-CN' | 'zh-TW';
}
declare class Wechatpay extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const wechatpay: () => Wechatpay;
export default wechatpay;
