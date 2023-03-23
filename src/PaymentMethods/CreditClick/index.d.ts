import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Pay } from './Models/Pay';
import { Refund } from './Models/Refund';
declare class CreditClick extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload: Pay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: Refund): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const creditClick: () => CreditClick;
export default creditClick;
