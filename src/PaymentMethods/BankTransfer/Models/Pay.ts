import Gender from '../../../Constants/Gender'
import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    customerFirstName: string
    customerLastName: string
    customerEmail: string
    customerGender?: Gender
    sendMail?: boolean
    dateDue?: string
    customerCountry?: string
}
