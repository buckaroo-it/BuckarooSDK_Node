import { PayablePaymentMethod } from "../../Services";
import { IRefundRequest } from "../../Models";
import { ServiceCode } from "../../Utils";

export default class KBC extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return "KBCPaymentButton";
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
