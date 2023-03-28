import IDebtor from '../../../Models/Services/IDebtor'
import IEmail from '../../../Models/Services/IEmail'
import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { ICreditArticle } from './Article'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import { ITransaction } from '../../../Models/ITransaction'

export interface IInvoice extends ITransaction {
    invoiceAmount: Number
    invoiceAmountVAT?: Number
    invoiceDate: string
    dueDate: string
    maxStepIndex?: Number
    allowedServices?: string
    disallowedServices?: string
    allowedServicesAfterDueDate?: string
    disallowedServicesAfterDueDate?: string
    code: string
    company?: Pick<ICompany,'culture'|'name'| 'vatApplicable' | 'vatNumber' | 'chamberOfCommerce'>
    person?: Omit<IPerson,'careOf'|'category'| 'name'| 'placeOfBirth'>
    address: IAddress
    debtor: IDebtor
    email: IEmail | string
    phone: IPhone
    articles?: ICreditArticle[]
    invoiceNumber: string
    schemeKey: string
    applyStartRecurrent?: boolean
    poNumber?: string
}
export const invoice = (data) => {
    const invoiceService = new ServiceParameters(data)
    invoiceService.setGroupTypes({
        address: 'Address',
        company: 'Company',
        person: 'Person',
        debtor: 'Debtor',
        phone: 'Phone',
        email: 'Email',
        articles: 'ProductLine'
    })
    invoiceService.setKeys({
        articles:{
            identifier:'ProductId',
            description:'ProductName',
            price:'PricePerUnit'
        },
        address: {
            houseNumberAdditional: 'HouseNumberSuffix'
        }
    })
    invoiceService.setCountable(['articles'])
    return invoiceService.data
}
