import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface IPay extends IPaymentRequest {
    voucherCode: string
}
export class Pay extends ServiceParameter {
    set voucherCode(voucherCode: string) {
        this.set('voucherCode', voucherCode)
    }
}
