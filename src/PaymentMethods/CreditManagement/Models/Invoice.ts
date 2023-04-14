import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'
import Gender from '../../../Constants/Gender'

export interface Invoice {
    invoiceAmount: number
    invoiceAmountVAT?: number
    invoiceDate: string
    dueDate: string
    schemeKey?: string
    maxStepIndex?: Number
    allowedServices?: string
    allowedServicesAfterDueDate?: string
    code: string
    person: {
        culture: string
        title: string
        initials: string
        firstName: string
        lastName: string
        lastNamePrefix: string
        gender: Gender
        birthDate: string
        placeOfBirth: string
    }
    company: {
        culture: string
        name: string
        vatApplicable: boolean
        vatNumber: string
        chamberOfCommerce: string
    }
    address: Omit<IAddress, 'houseNumberAdditional' | 'zipcode'> & {
        houseNumberSuffix?: string
        postalCode: string
    }
    debtor: {
        code: string
    }
    email?: { email: string }
    phone: IPhone
    productLine?:ICreditArticle[]
    invoiceNumber?: string
    applyStartRecurrent?: boolean
    [key: string]: any
}
export type IInvoice = Invoice & ITransaction
