import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IBankAccount from '../../../Models/Services/IBankAccount'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import IDebtor from '../../../Models/Services/IDebtor'
import { IRatePlan, IRatePlanCharges } from './RatePlan'
import { IConfiguration } from './Configuration'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface ISubscription {
    includeTransaction?: boolean
    transactionVatPercentage?: Number
    configurationCode?: string
    subscriptionGuid?: string
    termStartDay?: Number
    termStartMonth?: Number
    billingTiming?: Number
    termStartWeek?: string
    b2b?: string
    mandateReference?: string
    allowedServices?: string
    debtor?: IDebtor
    bankAccount?: IBankAccount
    email?: string
    phone?: Pick<IPhone, 'mobile'>
    address?: IAddress
    configuration?: IConfiguration
    customerIBAN?: string
    customerAccountName?: string
    customerBIC?: string
    person?: IPerson
    company?: ICompany
    ratePlans?: IRatePlan
    ratePlanCharges?: IRatePlanCharges
}
export class SubscriptionsModelStrategy extends ModelStrategy<ISubscription> {
    constructor(data) {
        super(data)
        this.groupTypes = {
            debtor: 'Debtor',
            person: 'Person',
            company: 'Person',
            email: 'Email',
            address: 'Address',
            configuration: 'AddConfiguration',
            ratePlans: {
                add: 'AddRatePlan',
                update: 'UpdateRatePlan',
                disable: 'DisableRatePlan'
            },
            ratePlanCharges: {
                add: 'AddRatePlanCharge',
                update: 'UpdateRatePlanCharge',
                disable: 'DisableRatePlanCharge'
            }
        }
        this.keys = {
            company: {
                companyName: 'Name',
                category: false,
                careOf: false
            },
            person: {
                category: false,
                careOf: false
            },
            address: {
                houseNumberAdditional: false
            }
        }
    }
}
