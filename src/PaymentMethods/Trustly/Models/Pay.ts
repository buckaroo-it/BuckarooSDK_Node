import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    country: 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'NL' | 'NO' | 'PL' | 'SE' | 'GB'
    customer: {
        firstName: string
        lastName: string
    }
}
export const Pay = (data) => {
    return {
        customerCountryCode: data.country,
        customerFirstName: data.customer.firstName,
        customerLastName: data.customer.lastName
    }
}
