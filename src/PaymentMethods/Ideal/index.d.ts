import { IPay } from './Models/Pay';
import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { RefundPayload } from '../../Models/ITransaction';
import { IConfig } from '../../Utils/Types';
declare class Ideal extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    protected _requiredFields: Array<keyof IConfig>;
    pay(payload?: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    setPayload(payload: IPay): void;
    issuers(): Promise<{
        id: any;
        name: any;
    }[]>;
}
declare const ideal: () => Ideal;
export default ideal;
