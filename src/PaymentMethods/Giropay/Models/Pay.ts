import { IPaymentRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IPay extends IPaymentRequest {
    bic?: string;
    costumerIBAN?: string;
}

export class Pay extends ServiceParameter {
    set bic(value: string) {
        this.set('bic', value);
    }

    set costumerIBAN(value: string) {
        this.set('costumerIBAN', value);
    }
}
