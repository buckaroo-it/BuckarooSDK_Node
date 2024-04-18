import { IPaymentRequest, ServiceParameter } from "../../../Models";

export default interface IPay extends IPaymentRequest {
    issuer: string;
    countryCode: string;
}

export class Pay extends ServiceParameter {
    set issuer(value: string) {
        this.set("issuer", value);
    }

    set countryCode(value: string) {
        this.set("countryCode", value);
    }
}
