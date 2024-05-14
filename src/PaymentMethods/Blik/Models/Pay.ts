import { IPaymentRequest, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    email?: string;
}

export class Pay extends ServiceParameter {
    set email(value: string) {
        this.set('email', value);
    }
}
