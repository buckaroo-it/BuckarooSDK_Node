import IRequest from '../../../Models/IRequest'
import gender from '../../../Constants/Gender'

export interface IInvitation extends IRequest {
    customerGender: gender
    customerFirstName: string
    customerLastName: string
    customerEmail: string
    merchantSendsEmail?: boolean
    email: string
    expirationDate?: string
    paymentMethodsAllowed?: string
    attachment?: string
}
