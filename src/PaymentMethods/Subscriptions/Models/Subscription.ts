import IPhone from "../../../Models/Services/IPhone";
import IAddress from "../../../Models/Services/IAddress";
import IBankAccount from "../../../Models/Services/IBankAccount";
import IPerson from "../../../Models/Services/IPerson";
import IEmail from "../../../Models/Services/IEmail";
import ICompany from "../../../Models/Services/ICompany";
import IDebtor from "../../../Models/Services/IDebtor";
import {IRatePlan, IRatePlanCharges, RatePlan} from "./RatePlan";
import {ServiceParameter} from "./ServiceParameter";


export interface ISubscription {
    includeTransaction?: boolean;
    transactionVatPercentage?: Number;
    configurationCode?: string;
    subscriptionGuid?: string;
    termStartDay?: Number;
    termStartMonth?: Number;
    billingTiming?: Number;
    termStartWeek?: string;
    b2b?: string;
    mandateReference?: string;
    allowedServices?: string;
    debtor?: IDebtor;
    bankAccount?: IBankAccount;
    email: IEmail | string;
    phone?: IPhone;
    address?: IAddress;
    configuration?:any
    person?: IPerson;
    company?: ICompany;
    ratePlans?: IRatePlan;
    ratePlanCharges?:IRatePlanCharges
}
export default class Subscription implements ISubscription{
    ratePlans;
    company?;
    ratePlanCharges
    email
    configuration?;
    debtor
    person
    constructor(data:ISubscription) {
        for (const dataKey in data) {
            this[dataKey] = data[dataKey]
        }
        this.email = new ServiceParameter(this.email,'Email','email').getData()
        this.debtor = new ServiceParameter(this.debtor,'Debtor').getData()
        this.person = new ServiceParameter(this.person,'Person').getData()
        this.configuration = new ServiceParameter(this.configuration,'AddConfiguration').getData()

        this.ratePlans = new RatePlan(this.ratePlans)
        this.ratePlanCharges = new RatePlan(this.ratePlanCharges, 'charge')

        if(this.company){
            this.company.name = this.company.companyName
            delete this.company.companyName
        }
    }

}