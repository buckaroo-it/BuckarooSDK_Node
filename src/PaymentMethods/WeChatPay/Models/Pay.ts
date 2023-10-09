import {IPaymentRequest} from "../../../Models/IRequest";
import {ServiceParameter} from "../../../Models/ServiceParameters";

export interface IPay extends IPaymentRequest {
    locale?: string
}
export class Pay extends ServiceParameter {
    set locale(value: string) {
        this.set('locale', value)
    }
}
