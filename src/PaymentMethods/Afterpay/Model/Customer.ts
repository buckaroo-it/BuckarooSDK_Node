import RecipientCategory from '../../../Constants/RecipientCategory'

type Salutation = 'Mr' | 'Mrs' | 'Miss'
interface Customer {
    companyName?: string
    salutation?: Salutation
    firstName: string
    lastName: string
    birthDate?: string
    street: string
    streetNumber?: string
    streetNumberAdditional?: string
    postalCode?: string
    city: string
    country: string
    email: string
    careOf?: string
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI'
    identificationNumber?: string
    customerNumber?: string
    mobilePhone?: string
    phone?: string
}
interface Person extends Customer {
    category: RecipientCategory.PERSON
}
interface Company extends Customer {
    category: RecipientCategory.COMPANY
    companyName: string
    identificationNumber: string
}
interface countryNLBE extends Customer {
    country: 'NL' | 'BE'
    salutation: Salutation
    birthDate: string
    streetNumber: string
}

interface countryFI  extends Customer  {
    country: 'FI'
    identificationNumber: string
}
interface countryDE  extends Customer  {
    country: 'DE'
}

export type AfterPayCustomer = ((Person | Company) & (countryNLBE | countryFI | countryDE))
