import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { RefundPayload } from '../../Models/ITransaction';
import { IPay } from './Models/Pay';
declare class Przelewy24 extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const przelewy24: () => Przelewy24;
export default przelewy24;
