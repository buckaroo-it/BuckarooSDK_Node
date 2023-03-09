import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class In3 extends PayablePaymentMethod {
    protected _paymentName: string;
    payininstallments(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    refund(payload: any): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const in3: () => In3;
export default in3;
