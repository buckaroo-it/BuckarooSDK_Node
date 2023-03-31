import IPerson from '../../../Models/Services/IPerson'
import { ModelStrategy } from '../../../Utils/ModelStrategy'
import Gender from '../../../Constants/Gender'

export type BankTransferPerson = {
    gender: Gender
} & Pick<IPerson, 'gender' | 'firstName' | 'lastName'>
export declare interface IPay {
    sendMail: boolean
    dateDue: string
    country: string
    email: string
    customer: BankTransferPerson
}
export class BankTransferModelStrategy extends ModelStrategy<IPay> {
    constructor(data) {
        super(data)
        this.keys = {
            customer: {
                gender: 'CustomerGender',
                firstName: 'CustomerFirstName',
                lastName: 'CustomerLastName'
            },
            email: 'CustomerEmail',
            country: 'CustomerCountry'
        }
    }
}
