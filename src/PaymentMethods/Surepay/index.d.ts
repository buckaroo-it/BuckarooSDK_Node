import PaymentMethod from '../PaymentMethod';
import { IVerify } from "./Models/Verify";
declare class Surepay extends PaymentMethod {
    protected _paymentName: string;
    _requiredFields: never[];
    verify(payload: IVerify): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const surepay: () => Surepay;
export default surepay;
