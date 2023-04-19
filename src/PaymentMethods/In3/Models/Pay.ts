import { Payload } from '../../../Models/ITransaction'
import Gender from '../../../Constants/Gender'
import RecipientCategory from '../../../Constants/RecipientCategory'

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

type Company = {
    name: string
    chamberOfCommerce: string
}
type Person = {
    gender: Gender
    culture: string
    initials: string
    lastName: string
    birthDate: string
}

export interface IPay extends Payload {
    description: string
    clientIP: string
    customerType: RecipientCategory.PERSON | RecipientCategory.COMPANY
    invoiceDate: string
    email: { email: string }
    phone: { phone?: string; fax?: string }
    company: Company
    person: Person
    address: Address
    productLine: Article[]
    subtotalLine: { name: string; value: number }[]
}
