import RecipientCategory from '../../../Constants/RecipientCategory'

type Salutation = 'Mr' | 'Mrs' | 'Miss'
type Customer = {
    companyName?: string
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
    salutation?: Salutation
}
type Person = {
    category: RecipientCategory.PERSON
}
type Company = {
    category: RecipientCategory.COMPANY
    companyName: string
    identificationNumber: string
}
type countryNLBE = {
    country: 'NL' | 'BE'
    salutation: Salutation
    birthDate: string
    streetNumber: string
    phone: string
}

type countryFI = {
    country: 'FI'
    identificationNumber: string
}
type countryDE = {
    country: 'DE'
}

export type AfterPayCustomer = Customer &
    ((Person | Company) & (countryNLBE | countryFI | countryDE))
