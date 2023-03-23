import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
import { RefundPayload } from '../../Models/ITransaction';
import { ICreate } from './Models/Create';
declare class Buckaroovoucher extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    getBalance(payload: Pick<IPay, 'voucherCode'>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    createApplication(payload: ICreate): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    deactivateVoucher(payload: Pick<IPay, 'voucherCode'>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const buckaroovoucher: () => Buckaroovoucher;
export default buckaroovoucher;
