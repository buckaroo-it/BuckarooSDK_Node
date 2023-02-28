import IPhone from "../../../Models/Services/IPhone";
import IAddress from "../../../Models/Services/IAddress";
import IBankAccount from "../../../Models/Services/IBankAccount";
import IPerson from "../../../Models/Services/IPerson";
import IEmail from "../../../Models/Services/IEmail";
import ICompany from "../../../Models/Services/ICompany";
import IDebtor from "../../../Models/Services/IDebtor";
import IRatePlan, {RatePlan} from "./RatePlan";


export interface ISubscription  {
    includeTransaction?:boolean
    transactionVatPercentage?:Number
    configurationCode?:string
    subscriptionGuid?:string
    termStartDay?:Number
    termStartMonth?:Number
    billingTiming?:Number
    termStartWeek?:string
    b2b?:string
    mandateReference?:string
    allowedServices?:string
    debtor?:IDebtor
    bankAccount?:IBankAccount
    email?:IEmail | string
    phone?:IPhone
    address?:IAddress
    person?:IPerson
    company?:ICompany
    rate_plans?:IRatePlan
}
export default class Subscription implements ISubscription{
    rate_plans;
    company?;
    constructor(data:ISubscription) {
        for (const dataKey in data) {
            this[dataKey] = data[dataKey]
        }
        this.rate_plans = new RatePlan(this.rate_plans)
        if(this.company){
            this.company.name = this.company.companyName
            delete this.company.companyName
        }
    }

}