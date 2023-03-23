import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
import { ICapture, RefundPayload } from '../../Models/ITransaction';
declare class Billink extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload?: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancelAuthorize(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    capture(payload: ICapture): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const billink: () => Billink;
export default billink;
