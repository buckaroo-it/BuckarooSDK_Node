import { IInvoice, invoice } from './Invoice'
import { ServiceParameters } from '../../../Utils/ServiceParameters'

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

export const debtorInfo = (data: IDebtor) => {
    const services = new ServiceParameters(data)
    services.setGroupType('debtor', 'debtor')
    return services
}
