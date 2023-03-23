import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { RefundPayload } from '../../Models/ITransaction';
import { IPay } from './Models/Pay';
declare class Trustly extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const trustly: () => Trustly;
export default trustly;
