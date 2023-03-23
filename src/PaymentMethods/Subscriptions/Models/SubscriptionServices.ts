import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IBankAccount from '../../../Models/Services/IBankAccount'
import IPerson from '../../../Models/Services/IPerson'
import IEmail from '../../../Models/Services/IEmail'
import ICompany from '../../../Models/Services/ICompany'
import IDebtor from '../../../Models/Services/IDebtor'
import { IRatePlan, IRatePlanCharges } from './RatePlan'
import { ServiceParameters } from '../../../Utils/ServiceParameter'
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
export const subscriptionServices = (data: ISubscription) => {
    let serviceData = new ServiceParameters(data)

    serviceData.setMultipleGroupType({
        debtor: 'Debtor',
        person: 'Person',
        email: 'Email',
        address: 'Address',
        configuration: 'AddConfiguration'
    })
    if (serviceData.company) {
        serviceData.company.setParameterKeys({
            companyName: 'Name'
        })
    }
    if (serviceData.ratePlans) {
        const types = Object.keys(serviceData.ratePlans)
        for (const type of types) {
            serviceData.ratePlans[type].groupType = firstUpperCase(type) + 'RatePlan'
        }
    }

    if (serviceData.ratePlanCharges) {
        const types = Object.keys(serviceData.ratePlanCharges)
        for (const type of types) {
            serviceData.ratePlanCharges[type].groupType = firstUpperCase(type) + 'RatePlanCharge'
        }
    }
    return serviceData
}
