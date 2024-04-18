import { PayablePaymentMethod } from "../../Services";
import { IPay, Pay } from "./Models/Pay";
import { ServiceCode } from "../../Utils";

export default class PointOfSale extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return "pospayment";
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
