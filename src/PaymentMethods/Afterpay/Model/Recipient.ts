import RecipientCategory from '../../../Constants/RecipientCategory'
import {ICustomer} from "../../../Models/Services/ICustomer";
import IAddress from "../../../Models/Services/IAddress";
import IPhone from "../../../Models/Services/IPhone";
import IPerson from "../../../Models/Services/IPerson";
import ICompany from "../../../Models/Services/ICompany";

export const enum country {
    NL = 'NL',
    DE = 'DE',
    FI = 'FI',
    BE = 'BE',
}
export declare interface Recipient extends ICustomer {
    category: RecipientCategory.COMPANY | RecipientCategory.PERSON
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI'
    identificationNumber?: string
    customerNumber?: string
    companyName?: string
    gender?: 'Mr' | 'Mrs' | 'Miss'
}
export declare interface Address extends IAddress{
    country: country
    street: string
    city: string
}

export declare interface Customer {
    recipient:Recipient & (IPerson | ICompany)
    address: Address
    phone?:IPhone
    email:string
}
export interface CountryNlBe {
    recipient:  {
        gender: 'Mr' | 'Mrs' | 'Miss'
        birthDate:string
    }
    address:{
        country: country.NL | country.BE
        houseNumber: string
        zipcode: string
    }
    phone:{
        mobile: string
    }
}
export interface CountryFi{
    recipient:  {
        identificationNumber:string
    }
    address: {
        country: country.FI
    }
}
export interface CountryDe{
    address: {
        country: country.DE
    }
}
export declare interface Company {
    recipient:  {
        category: RecipientCategory.COMPANY
        companyName: string
    }
}
export declare interface Person {
    recipient:  {
        category: RecipientCategory.PERSON
    }
}

type CountryFilter = CountryFi | CountryNlBe | CountryDe
type CategoryFilter = Person | Company


export type AfterPayCustomer =   Customer & (CountryFilter & CategoryFilter)
