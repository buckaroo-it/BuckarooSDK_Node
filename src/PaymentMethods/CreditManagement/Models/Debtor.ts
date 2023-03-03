import { IInvoice, invoice } from './Invoice'
import { ServiceParameter } from '../../../Utils/ServiceParameter'

export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean

    emailUnreachable?: boolean

    mobileUnreachable?: boolean

    landlineUnreachable?: boolean

    faxUnreachable?: boolean
}
export const debtor = (data: IDebtor) => {
    return {
        addressUnreachable: new ServiceParameter(
            data.addressUnreachable,
            'addressUnreachable',
            'Address'
        ),
        emailUnreachable: new ServiceParameter(data.emailUnreachable, 'emailUnreachable', 'Email'),
        mobileUnreachable: new ServiceParameter(
            data.mobileUnreachable,
            'mobileUnreachable',
            'Phone'
        ),
        landlineUnreachable: new ServiceParameter(
            data.landlineUnreachable,
            'landlineUnreachable',
            'Phone'
        ),
        faxUnreachable: new ServiceParameter(data.faxUnreachable, 'faxUnreachable', 'Phone'),
        ...invoice(data)
    }
}
