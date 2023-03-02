import IDebtor from "../../../Models/Services/IDebtor";
import IEmail from "../../../Models/Services/IEmail";
import IPhone from "../../../Models/Services/IPhone";
import IAddress from "../../../Models/Services/IAddress";
import IPerson from "../../../Models/Services/IPerson";
import ICompany from "../../../Models/Services/ICompany";
import Article, {Articles, ICreditArticle} from "./Article";
import Person from "../../Klarna/Models/Person";
import {ServiceParameter} from "../../../Utils/ServiceParameter";
import {Payload} from "../../../Models/Payload";

export interface IInvoice extends Payload{
    invoiceAmount:Number
    invoiceAmountVAT?:Number
    invoiceDate:string
    dueDate:string
    maxStepIndex?:Number
    allowedServices?:string
    disallowedServices?:string
    allowedServicesAfterDueDate?:string
    disallowedServicesAfterDueDate?:string
    code:string
    company?:ICompany
    person?:IPerson
    address:IAddress
    debtor:IDebtor
    email:IEmail | string
    phone:IPhone
    articles?:ICreditArticle[]
    invoiceNumber:string
    schemeKey:string
    applyStartRecurrent?:boolean
    poNumber?:string
}
export const invoice = (data:IInvoice) => {

    const groupTypes = {
        articles: {
            groupType: "ProductLine"
        },
        address: {
            groupType: "Address"
        },
        company: {
            groupType: "Company"
        },
        person: {
            groupType: "Person"
        },
        debtor: {
            groupType: "Debtor"
        },
        email: {
            groupType: "Email"
        },
        phone: {
            groupType: "Phone"
        }
    }
    let serviceData = {}
    for (const dataKey in data) {
        serviceData[dataKey] = new ServiceParameter(data[dataKey],dataKey)
        if(groupTypes[dataKey]){
            serviceData[dataKey].setGroupType(groupTypes[dataKey].groupType)
        }
    }
    if(typeof serviceData['articles'] !== 'undefined') {
        const articlesData = serviceData['articles'].getData()
        for (let key in articlesData) {
            articlesData[key] = new ServiceParameter(articlesData[key],key)
            articlesData[key].setKeys({
                identifier: 'ProductId',
                description: 'ProductName',
                price: 'PricePerUnit',
            })
            articlesData[key].setGroupId(parseInt(key)+1)
        }
    }
    return new Invoice(<IInvoice>serviceData)
}
class Invoice implements IInvoice {
    address: IAddress;
    allowedServices: string | undefined;
    allowedServicesAfterDueDate: string | undefined;
    applyStartRecurrent: boolean | undefined;
    articles: ICreditArticle[] | undefined;
    code: string;
    company: ICompany | undefined;
    debtor: IDebtor;
    disallowedServices: string | undefined;
    disallowedServicesAfterDueDate: string | undefined;
    dueDate: string;
    email: IEmail | string;
    invoiceAmount: Number;
    invoiceAmountVAT: Number | undefined;
    invoiceDate: string;
    invoiceNumber: string;
    maxStepIndex: Number | undefined;
    person: IPerson | undefined;
    phone: IPhone;
    poNumber: string | undefined;
    schemeKey: string;

    constructor(data:IInvoice) {
        this.address = data.address
        this.allowedServices  = data.allowedServices;
        this.allowedServicesAfterDueDate = data.allowedServicesAfterDueDate
        this.applyStartRecurrent = data.applyStartRecurrent
        this.articles = data.articles
        this.code = data.code
        this.company = data.company
        this.debtor = data.debtor
        this.disallowedServices = data.disallowedServices
        this.disallowedServicesAfterDueDate = data.disallowedServicesAfterDueDate
        this.dueDate = data.dueDate
        this.email = data.email
        this.invoiceAmount = data.invoiceAmount
        this.invoiceAmountVAT = data.invoiceAmountVAT
        this.invoiceDate = data.invoiceDate
        this.invoiceNumber = data.invoiceNumber;
        this.maxStepIndex = data.maxStepIndex;
        this.person = data.person
        this.phone = data.phone
        this.poNumber = data.poNumber
        this.schemeKey = data.schemeKey

    }


}
