import { Payload } from '../../../Models/ITransaction'
import Gender from '../../../Constants/Gender'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface Invitation {
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
export type IInvitation = Payload & Invitation
export class PayPerEmailModelStrategy extends ModelStrategy<Invitation> {
    constructor(data) {
        super(data)
        this.keys = {
            costumer: {
                gender: 'customerGender',
                firstName: 'customerFirstName',
                lastName: 'customerLastName'
            },
            email: 'customerEmail'
        }
    }
}
