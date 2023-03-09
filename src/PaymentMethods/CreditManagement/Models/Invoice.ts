import IDebtor from '../../../Models/Services/IDebtor'
import IEmail from '../../../Models/Services/IEmail'
import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { ICreditArticle } from './Article'
import { ServiceParameterList } from '../../../Utils/ServiceParameter'
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
export const invoice = (data: IInvoice) => {
    let services = new ServiceParameterList({
        invoiceAmount: data.invoiceAmount,
        invoiceDate: data.invoiceDate,
        dueDate: data.dueDate,
        code: data.code,
        address: data.address,
        allowedServices: data.allowedServices,
        allowedServicesAfterDueDate: data.allowedServicesAfterDueDate,
        applyStartRecurrent: data.applyStartRecurrent,
        articles: data.articles,
        company: data.company,
        disallowedServices: data.disallowedServices,
        disallowedServicesAfterDueDate: data.disallowedServicesAfterDueDate,
        invoiceAmountVAT: data.invoiceAmountVAT,
        maxStepIndex: data.maxStepIndex,
        person: data.person,
        poNumber: data.poNumber,
        debtor: data.debtor,
        email: data.email,
        phone: data.phone,
        invoiceNumber: data.invoiceNumber,
        schemeKey: data.schemeKey
    })
    services.setGroupTypes({
        articles: 'ProductLine',
        address: 'Address',
        company: 'Company',
        person: 'Person',
        debtor: 'Debtor',
        email: 'Email',
        phone: 'Phone'
    })
    if (services.list.articles) {
        services.list.articles.setKeys({
            identifier: 'ProductId',
            description: 'ProductName',
            price: 'PricePerUnit'
        })
        services.setCountable('articles')
    }
    return services
}
