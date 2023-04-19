import { Payload } from '../../../Models/ITransaction'
import gender from '../../../Constants/Gender'

export interface IInvitation extends Payload {
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
