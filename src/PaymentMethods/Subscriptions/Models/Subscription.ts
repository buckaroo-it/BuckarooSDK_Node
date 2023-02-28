import {serviceParameterKeyOf} from "../../../Utils/Functions";


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
    debtor?:Debtor
    bankAccount?:BankAccount
    email?:Email
    phone?:Phone
    address?:Address
    person?:Person
    company?:Company
    rate_plan?:RatePlan
}
export default class Subscription implements ISubscription{

    constructor(data:ISubscription) {
        for (const dataKey in data) {
            this[dataKey] = data[dataKey]
        }
    }

}

// class Debtor {
//     code:string
//     constructor(data) {
//         this.code = data.code
//     }
//
//     groupType(){
//         return 'Debtor'
//     }
// }
//
// class RatePlan {
//
//     constructor(data) {
//         for (const dataKey in data) {
//             this[dataKey] = data[dataKey]
//             this[dataKey].groupType = () => {
//                 return  serviceParameterKeyOf(dataKey) + 'RatePlan'
//             }
//         }
//     }
// }