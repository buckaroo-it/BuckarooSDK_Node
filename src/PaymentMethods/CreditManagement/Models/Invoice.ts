import IDebtor from '../../../Models/Services/IDebtor'
import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { ICreditArticle } from './Article'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import { ITransaction } from '../../../Models/ITransaction'
import {ModelStrategy} from "../../../Utils/ModelStrategy";

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
    company?: Omit<ICompany,'category'> & {culture:string}
    person?: Omit<IPerson,'careOf'> & {culture:string}
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
export class CreditManagementModelStrategy extends ModelStrategy<IInvoice>{
    setData(data: IInvoice) {
        super.setData(data);
    }
    constructor(data) {
        super(data);
        this.groupTypes = {
            address: 'Address',
            company: 'Company',
            person: 'Person',
            debtor: 'Debtor',
            phone: 'Phone',
            email: 'Email',
            articles: 'ProductLine'
        }
        this.keys = {
            articles:{
                identifier:'ProductId',
                description:'ProductName',
                price:'PricePerUnit',
            },
            address: {
                houseNumberAdditional: 'HouseNumberSuffix'
            }
        }
        this.countable = ['articles']
    }
}
