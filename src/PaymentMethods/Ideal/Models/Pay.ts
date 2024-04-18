import { IPaymentRequest, ServiceParameter } from "../../../Models";

export interface IPay extends IPaymentRequest {
    issuer?: string;
}

export class Pay extends ServiceParameter {
    set issuer(value: string) {
        this.set("issuer", value);
    }
}
