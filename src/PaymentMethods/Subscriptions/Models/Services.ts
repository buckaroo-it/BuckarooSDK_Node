import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { IRatePlan, IRatePlanCharge } from './RatePlan'
import { IConfiguration } from './Configuration'
import { ServiceParameter } from '../../../Utils/Types'

export interface ISubscription extends ServiceParameter {
    includeTransaction?: boolean
    transactionVatPercentage?: number
    configurationCode?: string
    subscriptionGuid?: string
    termStartDay?: number
    termStartMonth?: number
    billingTiming?: number
    termStartWeek?: string
    b2b?: string
    mandateReference?: string
    allowedServices?: string
    debtor?: {
        code: string
    }
    bankAccount?: {
        iban: string
        accountName: string
        bic: string
    }
    email?: string
    phone?: Pick<IPhone, 'mobile'>
    address?: IAddress
    configuration?: IConfiguration
    customerIBAN?: string
    customerAccountName?: string
    customerBIC?: string
    person?: Omit<IPerson, 'category' | 'careOf'>
    company?: Omit<ICompany, 'companyName' | 'category' | 'careOf'> & { name: string }
    ratePlan?: IRatePlan
    ratePlanCharge?: IRatePlanCharge
}
