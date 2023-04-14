import { Payload } from '../../../Models/ITransaction'
export interface IPay extends Payload {
    customerFirstName: string
    customerLastName: string
    customerEmail: string
    email: string
}
