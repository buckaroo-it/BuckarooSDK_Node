import { PayablePaymentMethod } from "../../Services";
import { IPay, Pay } from "./Models/Pay";
import { ServiceCode } from "../../Utils";

export default class Giropay extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return "giropay";
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
