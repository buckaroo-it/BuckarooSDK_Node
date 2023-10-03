import { IPaymentRequest } from '../../../Models/IRequest'

export interface IPay extends IPaymentRequest {
    customerCountryCode: 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'NL' | 'NO' | 'PL' | 'SE' | 'GB'
    customerFirstName: string
    customerLastName: string
}
