import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Payload, RefundPayload } from '../../Models/ITransaction';
declare class Payconiq extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: Payload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const payconiq: () => Payconiq;
export default payconiq;
