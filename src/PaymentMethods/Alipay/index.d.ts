import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Payload, RefundPayload } from '../../Models/ITransaction';
declare class Alipay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: {
        useMobileView: boolean;
    } & Payload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const alipay: () => Alipay;
export default alipay;
