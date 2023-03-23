import { Generate } from './Models/Generate';
import PaymentMethod from '../PaymentMethod';
declare class IdealQr extends PaymentMethod {
    protected _paymentName: string;
    generate(payload: Generate): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const idealQr: () => IdealQr;
export default idealQr;
