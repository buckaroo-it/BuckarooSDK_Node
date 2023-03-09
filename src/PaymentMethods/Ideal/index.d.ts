import { IPay } from './Models/Pay';
import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { RefundPayload } from '../../Models/ITransaction';
import { IConfig } from '../../Utils/Types';
declare class Ideal extends PayablePaymentMethod {
    protected _paymentName: string;
    protected _serviceVersion: number;
    protected requiredFields: Array<keyof IConfig>;
    protected services: (data: any) => import("../../Utils/ServiceParameter").ServiceParameterList;
    setPayload(payload: IPay): void;
    pay(payload?: IPay): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    issuers(): Promise<{
        id: any;
        name: any;
    }[]>;
}
declare const ideal: () => Ideal;
export default ideal;
