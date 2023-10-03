import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface ISecurityCode extends IPaymentRequest {
    encryptedSecurityCode: string
}
export class SecurityCode extends ServiceParameter {
    set encryptedSecurityCode(value: string) {
        this.set('encryptedSecurityCode', value)
    }
}
