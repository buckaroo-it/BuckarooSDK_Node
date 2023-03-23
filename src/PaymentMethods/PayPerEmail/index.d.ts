import PaymentMethod from "../PaymentMethod";
import { Invitation } from "./Models/invitation";
declare class PayPerEmail extends PaymentMethod {
    protected _paymentName: string;
    paymentInvitation(payload: Invitation): Promise<any>;
}
declare const payPerEmail: () => PayPerEmail;
export default payPerEmail;
