import IDebtor from '../../../Models/Services/IDebtor'
import IEmail from '../../../Models/Services/IEmail'
import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { ICreditArticle } from './Article'
import { ServiceParameters } from '../../../Utils/ServiceParameter'
import { ITransaction } from '../../../Models/ITransaction'
import {ArticleService} from "../../../Models/Services/IArticle";

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
export const invoice = (data) => {
    data.articles = ArticleService(data.articles,{
        keys: { identifier:'ProductId', description:'ProductName', price:'PricePerUnit'},
        groupId:true
    })
    let services = new ServiceParameters({
        address: data.address,
        company: data.company,
        person: data.person,
        debtor: data.debtor,
        phone: data.phone,
        email: data.email
    })

    services.setObjectGroupTypes({
        address: 'Address',
        company: 'Company',
        person: 'Person',
        debtor: 'Debtor',
        phone: 'Phone'
    })
    services.setGroupType('Email', 'email')
    Object.assign(data, services)
    return data
}
