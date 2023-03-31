import { Payload } from '../../../Models/ITransaction'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface Pay {
    country: 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'NL' | 'NO' | 'PL' | 'SE' | 'GB'
    customer: {
        firstName: string
        lastName: string
    }
}
export type IPay = Pay & Payload
export class TrustlyModelStrategy extends ModelStrategy<Pay> {
    constructor(data) {
        super(data)
        this.keys = {
            country: 'customerCountryCode',
            customer: {
                firstName: 'customerFirstName',
                lastName: 'customerLastName'
            }
        }
    }
}
