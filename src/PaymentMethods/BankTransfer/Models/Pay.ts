import Gender from '../../../Constants/Gender'
import { Payload } from '../../../Models/ITransaction'

export type BankTransferPerson = {
    customerFirstName: string
    customerLastName: string
    customerGender: Gender
}
type ServiceParameters = {
    sendMail: boolean
    dateDue: string
    customerCountry: string
    customerEmail: string
} & BankTransferPerson

export type IPay = Payload & ServiceParameters
