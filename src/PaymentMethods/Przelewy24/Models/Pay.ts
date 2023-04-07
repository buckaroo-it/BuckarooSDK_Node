import { Payload } from '../../../Models/ITransaction'
import IPerson from '../../../Models/Services/IPerson'

export interface IPay extends Payload {
    costumer: Pick<IPerson, 'firstName' | 'lastName'>
    customerFirstName: string
    lastName: string
    customerEmail: string
    email: string
}
