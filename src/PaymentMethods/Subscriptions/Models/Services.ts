import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IBankAccount from '../../../Models/Services/IBankAccount'
import IPerson from '../../../Models/Services/IPerson'
import IEmail from '../../../Models/Services/IEmail'
import ICompany from '../../../Models/Services/ICompany'
import IDebtor from '../../../Models/Services/IDebtor'
import { IRatePlan, IRatePlanCharges } from './RatePlan'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import { firstUpperCase } from '../../../Utils/Functions'
import { IConfiguration } from './Configuration'

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
    email: IEmail | string
    phone?: IPhone
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
export const services = (data: ISubscription) => {
    let serviceData = new ServiceParameters(data)

    serviceData.setGroupTypes({
        debtor: 'Debtor',
        person: 'Person',
        email: 'Email',
        address: 'Address',
        configuration: 'AddConfiguration'
    })
    serviceData.setKeys({
        company: {
            companyName: 'Name'
        }
    })
    serviceData.setGroupTypes({
        add: 'AddRatePlan',
        update: 'UpdateRatePlan',
        disable: 'DisableRatePlan'
    }, serviceData.data.ratePlans)

    serviceData.setGroupTypes({
        add: 'AddRatePlanCharge',
        update: 'UpdateRatePlanCharge',
        disable: 'DisableRatePlanCharge'
    }, serviceData.data.ratePlanCharges)

    return serviceData.data
}
