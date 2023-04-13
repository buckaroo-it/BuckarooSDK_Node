import { Payload } from '../../../Models/ITransaction'
import {IPAddress, ServiceParameters} from '../../../Utils/Types'

type Article = {
    code: string
    name: string
    quantity: number
    price: number
}

type Address = {
    street: string
    houseNumber: number
    houseNumberSuffix: string
    zipCode: string
    city: string
    country: string
}

export interface IPay extends Payload {
    description: string
    clientIP: IPAddress | string
    customerType: string
    invoiceDate: string
    email: { email: string }
    phone: { phone?: string; fax?: string }
    company: ServiceParameters
    person: ServiceParameters
    address:Address
    productLine: Article[]
    subtotalLine: { name: string; value: number }[]
}
