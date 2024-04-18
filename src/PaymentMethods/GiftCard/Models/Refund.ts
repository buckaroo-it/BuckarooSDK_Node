import { IRefundRequest, ServiceParameter } from "../../../Models";

export interface IRefund extends IRefundRequest {
    email?: string;
    lastName?: string;
}

export class Refund extends ServiceParameter {
    set email(value: string) {
        this.set("email", value);
    }

    set lastName(value: string) {
        this.set("lastName", value);
    }
}
