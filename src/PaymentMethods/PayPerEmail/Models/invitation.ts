import { Payload } from '../../../Models/ITransaction'
import Gender from '../../../Constants/Gender'

export interface Invitation extends Payload {
    costumer: {
        firstName: string
        lastName: string
        gender: Gender
    }
    merchantSendsEmail?: boolean
    email: string
    expirationDate?: string
    paymentMethodsAllowed?: string
    attachment?: string
}
export const services = (data: Invitation) => {
    return {
        customerGender: data.costumer.gender,
        customerFirstName: data.costumer.firstName,
        customerLastName: data.costumer.lastName,
        merchantSendsEmail: data.merchantSendsEmail,
        customerEmail: data.email,
        expirationDate: data.expirationDate,
        paymentMethodsAllowed: data.paymentMethodsAllowed,
        attachment: data.attachment
    }
}
