import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay, IPayComplete, IPayEncrypted, IPayOneClick } from './Models/Pay';
import { RefundPayload } from '../../Models/ITransaction';
declare class Bancontact extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authenticate(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payOneClick(payload: IPayOneClick): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payEncrypted(payload: IPayEncrypted): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    completePayment(payload: IPayComplete): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payRecurring(payload: IPayOneClick): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const bancontact: () => Bancontact;
export default bancontact;
