import { IPaymentRequest } from '../../../Models';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IPay extends IPaymentRequest {
    terminalId: string;
}

export class Pay extends ServiceParameter {
    set terminalId(value: string) {
        this.set('terminalID', value);
    }
}
