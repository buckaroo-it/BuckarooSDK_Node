import IPhone from '../../../Models/Services/IPhone'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import ICompany from '../../../Models/Services/ICompany'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import RecipientCategory from '../../../Constants/RecipientCategory'
import IEmail from "../../../Models/Services/IEmail";

interface Person extends Omit<IPerson,'culture'|'initials'|'lastNamePrefix'|'placeOfBirth' | 'name'>{

}
export declare interface AfterPayPerson extends Person {
    category: RecipientCategory.PERSON
    customerNumber?: string
    identificationNumber?: string
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI'
}
declare interface AfterPayCompany extends Person,ICompany {
    category: RecipientCategory.COMPANY
}
interface Address extends Omit<IAddress,'state'>{
    country: 'NL' | 'BE' | 'DE' | 'AT' | 'FI'
}

export declare interface IBillingRecipient {
    recipient: AfterPayPerson | AfterPayCompany
    address: Address
    email: IEmail
    phone: Omit<IPhone, 'fax'>
}
export declare interface IShippingRecipient {
    recipient: AfterPayPerson | AfterPayCompany
    address: Address
    email: IEmail
    phone?: Omit<IPhone, 'fax'>
}