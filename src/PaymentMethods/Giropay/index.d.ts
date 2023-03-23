import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Pay } from './Models/Pay';
import { RefundPayload } from '../../Models/ITransaction';
declare class Giropay extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: Pay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const giropay: () => Giropay;
export default giropay;
