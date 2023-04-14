import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import { IRatePlan, IRatePlanCharge } from './RatePlan'
import { IConfiguration } from './Configuration'
import { ServiceParameters } from '../../../Utils/Types'

type Person = {
    firstName: string
    lastName: string
    birthDate: string
    gender: string
    culture?: string
}
type Company = {
    name: string
    culture?: string
    vatApplicable: boolean
    vatNumber: string
    chamberOfCommerce: string
}

export interface ISubscription extends ServiceParameters {
    address?: IAddress
    allowedServices?: string
    b2b?: string
    billingTiming?: number
    company?:Company
    addConfiguration?: IConfiguration
    configurationCode?: string
    customerAccountName?: string
    customerBIC?: string
    customerIBAN?: string
    customerNumberOfDays?: string
    debtor?: {
        code: string
    }
    email?: {
        email: string
    }
    includeTransaction?: boolean
    fieldName?: string
    mandateReference?: string
    person?: Person
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
