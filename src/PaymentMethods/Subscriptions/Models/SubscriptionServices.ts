import IPhone from '../../../Models/Services/IPhone'
import IAddress from '../../../Models/Services/IAddress'
import IBankAccount from '../../../Models/Services/IBankAccount'
import IPerson from '../../../Models/Services/IPerson'
import IEmail from '../../../Models/Services/IEmail'
import ICompany from '../../../Models/Services/ICompany'
import IDebtor from '../../../Models/Services/IDebtor'
import { IRatePlan, IRatePlanCharges } from './RatePlan'
import {ServiceParameterList} from "../../../Utils/ServiceParameter";
import {serviceParameterKeyOf} from "../../../Utils/Functions";
import {IConfiguration} from "./Configuration";

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
    customerIBAN?:string
    customerAccountName?:string
    customerBIC?:string
    person?: IPerson
    company?: ICompany
    ratePlans?: IRatePlan
    ratePlanCharges?: IRatePlanCharges
}
export const subscriptionServices = (data:ISubscription) => {
    let serviceData = new ServiceParameterList(data)
    serviceData.setGroupTypes({
        debtor: 'Debtor',
        person: 'Person',
        email: 'Email',
        address: 'Address',
        configuration: 'AddConfiguration',
    })
    if(serviceData.list.company){
        serviceData.list.company.setKeys({
            companyName:'Name'
        })
    }
    if(serviceData.list.ratePlans){
        const types = Object.keys(serviceData.list.ratePlans.data)
        for (const type of types) {
            serviceData.list.ratePlans.data[type].groupType = serviceParameterKeyOf(type) + 'RatePlan'
        }
    }

    if(serviceData.list.ratePlanCharges){
        const types = Object.keys(serviceData.list.ratePlanCharges.data)
        for (const type of types) {
            serviceData.list.ratePlanCharges.data[type].groupType = serviceParameterKeyOf(type) + 'RatePlanCharge'
        }
    }
    return serviceData
}
