import { Payload } from '../../../Models/ITransaction'
import ICompany from '../../../Models/Services/ICompany'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import { IPAddress } from '../../../Utils/Types'

type IArticle = {
    identifier: string
    type: string
    brand: string
    manufacturer: string
    unitCode: string
    quantity: number
    price: number
    vatCategory: number
    vatPercentage: number
    description: string
}



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
    products: {productLine: IArticle }[]
    subtotalLine: { name: string; value: number }[]
}
