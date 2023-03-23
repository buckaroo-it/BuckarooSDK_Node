import IDebtor from '../../../Models/Services/IDebtor'
import IEmail from '../../../Models/Services/IEmail'
import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { CreditArticle, ICreditArticle } from './Article'
import { ServiceParameters } from '../../../Utils/ServiceParameter'
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
    company?: ICompany
    person?: IPerson
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
export const invoice = (data: ServiceParameters) => {
    if (!(data instanceof ServiceParameters)) {
        data = new ServiceParameters(data)
    }
    let articles = data.findParameter('articles')
    if (articles) {
        data.articles = CreditArticle(data.articles)
    }
    data.setMultipleGroupType({
        address: 'Address',
        company: 'Company',
        person: 'Person',
        debtor: 'Debtor',
        phone: 'Phone'
    })
    data.setGroupType('Email', 'email')

    return data
}
