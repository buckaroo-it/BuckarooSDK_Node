import { IInvoice, invoice } from './Invoice'
import { ServiceParameterList } from '../../../Utils/ServiceParameter'

export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean

    emailUnreachable?: boolean

    mobileUnreachable?: boolean

    landlineUnreachable?: boolean

    faxUnreachable?: boolean
}
export const debtor = (data: IDebtor) => {
    let serviceData = new ServiceParameterList({
        addressUnreachable: data.addressUnreachable,
        emailUnreachable: data.emailUnreachable,
        mobileUnreachable: data.mobileUnreachable,
        landlineUnreachable: data.landlineUnreachable,
        faxUnreachable: data.faxUnreachable
    })
    serviceData.setGroupTypes({
        addressUnreachable: 'Address',
        emailUnreachable: 'Email',
        mobileUnreachable: 'Phone',
        landlineUnreachable: 'Phone',
        faxUnreachable: 'Phone'
    })
    return Object.assign(serviceData, invoice(data))
}
