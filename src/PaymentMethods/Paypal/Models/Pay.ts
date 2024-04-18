import { IPaymentRequest, ServiceParameter } from "../../../Models";

export interface IPay extends IPaymentRequest {
    buyerEmail?: string;
    productName?: string;
    billingAgreementDescription?: string;
    pageStyle?: string;
    payPalOrderId?: string;
}

export class Pay extends ServiceParameter {
    set buyerEmail(value: string) {
        this.set("buyerEmail", value);
    }

    set productName(value: string) {
        this.set("productName", value);
    }

    set billingAgreementDescription(value: string) {
        this.set("billingAgreementDescription", value);
    }

    set pageStyle(value: string) {
        this.set("pageStyle", value);
    }

    set payPalOrderId(value: string) {
        this.set("payPalOrderId", value);
    }
}
