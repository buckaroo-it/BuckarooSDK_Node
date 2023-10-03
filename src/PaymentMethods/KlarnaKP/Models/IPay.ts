import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface IPay extends IPaymentRequest {
    reservationNumber?: string
}
export class Pay extends ServiceParameter {
    set reservationNumber(value: string) {
        this.set('reservationNumber', value)
    }
}
