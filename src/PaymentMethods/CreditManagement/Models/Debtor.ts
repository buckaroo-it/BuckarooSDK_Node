import { IInvoice } from './Invoice'

export interface Debtor {
    addressUnreachable?: boolean

    emailUnreachable?: boolean

    mobileUnreachable?: boolean

    landlineUnreachable?: boolean

    faxUnreachable?: boolean
}
export type IDebtor = Debtor & IInvoice
