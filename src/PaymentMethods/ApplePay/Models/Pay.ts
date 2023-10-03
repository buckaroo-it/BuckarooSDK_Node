import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface IPay extends IPaymentRequest {
    paymentData: string
    customerCardName: string
}
export class Pay extends ServiceParameter {
    set paymentData(value: string) {
        this.set('paymentData', value)
    }
    set customerCardName(value: string) {
        this.set('customerCardName', value)
    }
}
