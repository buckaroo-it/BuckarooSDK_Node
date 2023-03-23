import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
import { ICapture, RefundPayload } from '../../Models/ITransaction';
import { IExtraInfo } from './Models/ExtraInfo';
import { IEmandate } from './Models/Emandate';
declare class SEPA extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    pay(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payRecurrent(payload: Pick<IPay, 'collectDate'> & ICapture): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    extraInfo(payload: IExtraInfo): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payWithEmandate(payload: IEmandate): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const sepa: () => SEPA;
export default sepa;
