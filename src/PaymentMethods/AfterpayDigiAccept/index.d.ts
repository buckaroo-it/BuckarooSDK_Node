import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class AfterpayDigiAccept extends PayablePaymentMethod {
    protected _paymentName: string;
    pay(payload?: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const afterpaydigiaccept: () => AfterpayDigiAccept;
export default afterpaydigiaccept;
