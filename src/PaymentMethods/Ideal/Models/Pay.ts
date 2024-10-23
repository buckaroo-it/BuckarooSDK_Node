import { IPaymentRequest, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    issuer?: string;
    shippingCosts?: number;
}

export class Pay extends ServiceParameter {
    set issuer(value: string) {
        this.set('issuer', value);
    }

    set shippingCosts(value: number) {
        this.set('shippingCosts', value);
    }
}
