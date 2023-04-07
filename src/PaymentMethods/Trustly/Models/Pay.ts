import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    customerCountryCode: 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'NL' | 'NO' | 'PL' | 'SE' | 'GB'
    customerFirstName: string
    customerLastName: string
}
