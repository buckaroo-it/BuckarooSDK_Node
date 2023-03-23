import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
import { RefundPayload } from '../../Models/ITransaction';
declare class In3 extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payInInstallments(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const in3: () => In3;
export default in3;
