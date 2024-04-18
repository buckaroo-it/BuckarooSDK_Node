import { IPaymentRequest, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    voucherCode: string;
}

export class Pay extends ServiceParameter {
    set voucherCode(voucherCode: string) {
        this.set('voucherCode', voucherCode);
    }
}
