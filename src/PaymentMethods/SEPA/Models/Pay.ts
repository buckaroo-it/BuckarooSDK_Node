import { Payload } from '../../../Models/ITransaction'

export interface Pay {
    bic: string
    iban: string
    collectDate?: string
    mandateReference?: string
    mandateDate?: string
    customer: {
        name: string
    }
}
export type IPay = Pay & Payload
