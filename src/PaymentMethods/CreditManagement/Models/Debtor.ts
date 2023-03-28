import { IInvoice, invoice } from './Invoice'
import { ServiceParameters } from '../../../Utils/ServiceParameters'

export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean

    emailUnreachable?: boolean

    mobileUnreachable?: boolean

    landlineUnreachable?: boolean

    faxUnreachable?: boolean
}
export const debtor = (data:IDebtor) => {
    const debtorService = new ServiceParameters(data)
    debtorService.setGroupTypes({
        addressUnreachable: 'Address',
        emailUnreachable: 'Email',
        mobileUnreachable: 'Phone',
        landlineUnreachable: 'Phone',
        faxUnreachable: 'Phone'
    })
    return debtorService.data
}

export const debtorInfo = (data: Pick<IDebtor,'debtor'>) => {
    const services = new ServiceParameters(data)
    services.setKeys({
        debtor: {
            code: 'debtorCode'
        }
    })
    return services.data
}
