import IDebtor from '../../../Models/Services/IDebtor'
import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'

export interface Invoice {
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
    company?: Omit<ICompany, 'category'> & { culture: string }
    person?: Omit<IPerson, 'careOf'> & { culture: string }
    address: IAddress
    debtor: IDebtor
    email: string
    phone: IPhone
    articles?: ICreditArticle[]
    invoiceNumber: string
    schemeKey: string
    applyStartRecurrent?: boolean
    poNumber?: string
}
export type IInvoice = Invoice & ITransaction
