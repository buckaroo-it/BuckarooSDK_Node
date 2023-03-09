import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IPay } from './Models/Pay';
import { IConfig } from '../../Utils/Types';
import { RefundPayload } from '../../Models/ITransaction';
import { TransactionResponse } from '../../Models/TransactionResponse';
declare class Klarna extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    protected requiredFields: Array<keyof IConfig>;
    pay(payload?: IPay): Promise<TransactionResponse>;
    setPayload(payload: IPay): void;
    refund(payload: RefundPayload): Promise<TransactionResponse>;
    payInInstallments(payload: any): Promise<TransactionResponse>;
}
declare const klarna: () => Klarna;
export default klarna;
