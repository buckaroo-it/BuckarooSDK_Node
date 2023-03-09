import PaymentMethod from './PaymentMethod';
import { Payload, RefundPayload } from '../Models/ITransaction';
import { TransactionResponse } from "../Models/TransactionResponse";
import { IConfig } from "../Utils/Types";
export declare abstract class PayablePaymentMethod extends PaymentMethod {
    protected requiredFields: Array<keyof IConfig>;
    protected transactionRequest(payload?: any): Promise<TransactionResponse>;
    protected pay(payload?: Payload): Promise<TransactionResponse>;
    protected refund(payload?: RefundPayload): Promise<TransactionResponse>;
    setPayload(payload: any): void;
}
