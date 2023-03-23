import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { IEncrypted, ISecurityCodePay } from './Models/Pay';
import { ICapture, Payload, RefundPayload } from '../../Models/ITransaction';
declare class Creditcard extends PayablePaymentMethod {
    pay(payload: Payload & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payEncrypted(payload: IEncrypted & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payWithSecurityCode(payload: ISecurityCodePay & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorize(payload: Payload & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorizeWithSecurityCode(payload: ISecurityCodePay & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    authorizeEncrypted(payload: IEncrypted & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    cancelAuthorize(payload: RefundPayload & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    capture(payload: ICapture & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    payRecurrent(payload: ICapture & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    setPayload(payload: any): void;
}
declare const creditcard: () => Creditcard;
export default creditcard;
