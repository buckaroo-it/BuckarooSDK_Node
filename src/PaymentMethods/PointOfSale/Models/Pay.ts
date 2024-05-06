import { IPaymentRequest, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    terminalId: string;
}

export class Pay extends ServiceParameter {
    set terminalId(value: string) {
        this.set('terminalID', value);
    }
}
