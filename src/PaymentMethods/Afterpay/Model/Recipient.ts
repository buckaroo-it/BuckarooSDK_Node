import RecipientCategory from '../../../Constants/RecipientCategory'
import IAddress from '../../../Models/Services/IAddress'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import IPhone from '../../../Models/Services/IPhone'

export const enum country {
    NL = 'NL',
    DE = 'DE',
    FI = 'FI',
    BE = 'BE'
}
type AfterPayRecipient = {
    category: RecipientCategory.COMPANY | RecipientCategory.PERSON
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI'
    identificationNumber?: string
    customerNumber?: string
    gender?: 'Mr' | 'Mrs' | 'Miss'
} & (ICompany | IPerson)

export declare interface Address extends IAddress {
    country: country
}
export declare interface AfterPayCustomer {
    recipient: AfterPayRecipient
    address: Address
    phone?: Omit<IPhone, 'fax'>
    email: string
}
// export interface CountryNlBe{
//     recipient:  {
//         gender: 'Mr' | 'Mrs' | 'Miss'
//         birthDate:string
//     }
//     address:{
//         country: country.NL | country.BE
//         houseNumber: string
//         zipcode: string
//     }
//     phone:{
//         mobile: string
//     }
// }
// export interface CountryFi{
//     recipient:  {
//         identificationNumber:string
//     }
//     address: {
//         country: country.FI
//     }
// }
// export interface CountryDe {
//     address: {
//         country: country.DE
//     }
// }
// export declare interface Company {
//     recipient:  {
//         category: RecipientCategory.COMPANY
//         companyName: string
//     }
// }
// export declare interface Person {
//     recipient:  {
//         category: RecipientCategory.PERSON
//     }
// }
//
// type CountryFilter =  CountryFi | CountryNlBe | CountryDe
// type CategoryFilter =  Company | Person
//
// export type AfterPayCustomer = Customer & (CountryFilter & CategoryFilter)
