import { PayablePaymentMethod } from '../PayablePaymentMethod';
import { Payload, RefundPayload } from "../../Models/ITransaction";
declare class GiftCard extends PayablePaymentMethod {
    pay(payload: Payload & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: RefundPayload & {
        name: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    setPayload(payload: any): void;
}
declare const giftCard: () => GiftCard;
export default giftCard;
