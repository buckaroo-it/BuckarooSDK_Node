import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Payload, RefundPayload } from '../../Models/ITransaction';
declare class Belfius extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: Payload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const belfius: () => Belfius;
export default belfius;
