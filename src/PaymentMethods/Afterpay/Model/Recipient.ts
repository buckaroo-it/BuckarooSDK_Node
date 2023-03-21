import IPhone from '../../../Models/Services/IPhone'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import ICompany from '../../../Models/Services/ICompany'
import { ServiceParameters } from '../../../Utils/ServiceParameter'
import RecipientCategory from '../../../Constants/RecipientCategory'

export declare interface Person extends IPerson {
    category: RecipientCategory
    firstName: string
    lastName: string
    customerNumber?: string
    identificationNumber?: string
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI'
}

export declare interface IBillingRecipient {
    recipient: Person | ICompany
    address: Omit<Required<IAddress>, 'state'>
    email: string
    phone: Pick<IPhone, 'mobile'>
}
export declare interface IShippingRecipient {
    recipient: Person | ICompany
    address: Omit<Required<IAddress>, 'state'>
    email: string
    phone?: Pick<IPhone, 'mobile'>
}
export function adaptBilling(billing: ServiceParameters) {
    billing.groupType = 'BillingCustomer'
    billing.recipient = adaptRecipient(billing.recipient)
    billing.address = adaptAddress(billing.address)
    billing.phone = adaptPhone(billing.phone)

    return billing
}
export function adaptShipping(shipping: ServiceParameters) {
    shipping.groupType = 'ShippingCustomer'
    shipping.recipient = adaptRecipient(shipping.recipient)
    shipping.address = adaptAddress(shipping.address)
    shipping.phone = adaptPhone(shipping.phone)

    return shipping
}
export const adaptRecipient = (recipient: ServiceParameters) => {
    recipient.setParameterKeys({
        title: 'Salutation',
        chamberOfCommerce: 'IdentificationNumber'
    })
    return recipient
}

export const adaptAddress = (address: ServiceParameters) => {
    address.setParameterKeys({
        houseNumber: 'streetNumber',
        houseNumberAdditional: 'streetNumberAdditional',
        zipcode: 'postalCode'
    })
    return address
}
export const adaptPhone = (phone?: ServiceParameters) => {
    if (phone) {
        phone.setParameterKeys({ mobile: 'phone' })
        return phone
    }
}
