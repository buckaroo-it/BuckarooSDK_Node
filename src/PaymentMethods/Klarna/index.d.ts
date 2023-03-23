import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
import { IConfig } from '../../Utils/Types';
import { RefundPayload } from '../../Models/ITransaction';
declare class Klarna extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    protected _requiredFields: Array<keyof IConfig>;
    pay(payload?: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    setPayload(payload: IPay): void;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payInInstallments(payload: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const klarna: () => Klarna;
export default klarna;
