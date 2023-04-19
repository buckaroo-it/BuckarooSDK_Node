import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    customeraccountname: string
    customerBIC?: string
    customerIBAN: string
    collectDate: string
    mandateReference?: string
    mandateDate?: string
}
