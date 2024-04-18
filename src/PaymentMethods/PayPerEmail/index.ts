import { PaymentMethod } from "../../Services";
import { IInvitation, Invitation } from "./Models/Invitation";
import { ServiceCode } from "../../Utils";

export default class PayPerEmail extends PaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return "payperemail";
    }

    paymentInvitation(payload: IInvitation) {
        this.setServiceList("paymentInvitation", new Invitation(payload));
        return super.transactionRequest(payload);
    }
}
