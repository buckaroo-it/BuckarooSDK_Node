import { Payload } from '../../../Models/ITransaction'
import { IArticle } from '../../../Models/Services/IArticle'
import ICompany from '../../../Models/Services/ICompany'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import { IPAddress } from '../../../Utils/Types'

export interface IPay extends Payload {
    description: string
    clientIP: IPAddress | string
    customerType: string
    invoiceDate: string
    email: { email: string }
    phone: { phone?: string; fax?: string }
    company: Omit<ICompany, 'name'> & { name: string }
    person: IPerson
    address: Omit<IAddress, 'houseNumberAdditional'> & { houseNumberSuffix: string }
    productLine: IArticle[]
    subtotalLine: { name: string; value: Number }[]
}
