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
export type AfterPayRecipient = {
    category: RecipientCategory.COMPANY | RecipientCategory.PERSON
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI'
    identificationNumber?: string
    customerNumber?: string
    gender?: 'Mr' | 'Mrs' | 'Miss'
}

export declare interface AfterPayAddress extends IAddress {
    country: country
}
export declare interface AfterPayCustomer {
    recipient: AfterPayRecipient & (IPerson | ICompany)
    address: AfterPayAddress
    phone?: IPhone
    email: string
}
