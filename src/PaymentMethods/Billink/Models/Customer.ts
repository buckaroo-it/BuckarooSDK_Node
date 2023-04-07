type Salutation = 'Male' | 'Female' | 'Unknown'
export interface Customer {
    chamberOfCommerce: string //
    initials: string //
    salutation?: Salutation
    firstName: string
    lastName: string
    birthDate?: string
    street: string
    streetNumber: number
    streetNumberAdditional?: string
    postalCode: string
    city: string
    country?: 'NL' | 'BE'
    email?: string
    careOf?: string
    mobilePhone?: string
    phone?: string
}
