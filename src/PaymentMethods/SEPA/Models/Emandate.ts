import { IPaymentRequest } from '../../../Models/IRequest'

export interface IEmandate extends IPaymentRequest {
    mandateReference: string
    collectdate?: string
}
