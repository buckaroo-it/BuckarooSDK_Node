import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { ICapture, RefundPayload } from '../../Models/ITransaction';
import { IPay } from './Models/Pay';
import { IExtraInfo } from './Models/ExtraInfo';
declare class Paypal extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payRecurring(payload: ICapture): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    extraInfo(payload: IExtraInfo): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const paypal: () => Paypal;
export default paypal;
