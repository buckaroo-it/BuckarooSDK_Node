import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Model/Services';
import { ICapture, RefundPayload } from '../../Models/ITransaction';
declare class Afterpay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload?: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    setPayload(payload: IPay): void;
    authorize(payload?: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancelAuthorize(payload?: ICapture): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    capture(payload?: ICapture & Partial<Pick<IPay, 'articles'>>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload?: Partial<Pick<IPay, 'articles'>> & RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const afterpay: () => Afterpay;
export default afterpay;
