import { IInvoice, invoice } from './Invoice'
import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean

    emailUnreachable?: boolean

    mobileUnreachable?: boolean

    landlineUnreachable?: boolean

    faxUnreachable?: boolean
}
export const debtor = (data: ServiceParameters) => {
    invoice(data)
    data.setGroupType('addressUnreachable', 'Address')
    data.setGroupType('emailUnreachable', 'Email')
    data.setGroupType('mobileUnreachable', 'Phone')
    data.setGroupType('landlineUnreachable', 'Phone')
    data.setGroupType('faxUnreachable', 'Phone')

    return data
}

export const debtorInfo = (data: ServiceParameters) => {
    data.setGroupType('debtor', 'debtor')
    return data
}
