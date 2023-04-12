import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import { IRatePlan, IRatePlanCharge } from './RatePlan'
import { IConfiguration } from './Configuration'
import { ServiceParameters } from '../../../Utils/Types'

export interface ISubscription extends ServiceParameters {
    address?: IAddress
    allowedServices?: string
    b2b?: string
    billingTiming?: number
    company?: Omit<ICompany, 'companyName' | 'category' | 'careOf'> & { name: string }
    addConfiguration?: IConfiguration
    configurationCode?: string
    customerAccountName?: string
    customerBIC?: string
    customerIBAN?: string
    customerNumberofDays?: string
    debtor?: {
        code: string
    }
    email?: {
        email: string
    }
    includeTransaction?: boolean
    fieldname?: string
    mandateReference?: string
    person?: Omit<IPerson, 'category' | 'careOf'>
    phone?: Partial<IPhone>
    ratePlan?: IRatePlan
    ratePlanCharge?: IRatePlanCharge
    subscriptionGuid?: string
    termStartDay?: number
    termStartMonth?: number
    termStartWeek?: string
    transactionVatPercentage?: number
    tokenPaymentMethod?: string
}
