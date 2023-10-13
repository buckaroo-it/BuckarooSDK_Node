import { IPaymentRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
export interface IPay extends IPaymentRequest {
    issuer?: string;
}
export class Pay extends ServiceParameter {
    set issuer(value: string) {
        this.set('issuer', value);
    }
}
