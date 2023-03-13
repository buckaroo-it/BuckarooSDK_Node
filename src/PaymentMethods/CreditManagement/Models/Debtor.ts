import { IInvoice, invoice } from './Invoice'
import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean

    emailUnreachable?: boolean

    mobileUnreachable?: boolean

    landlineUnreachable?: boolean

    faxUnreachable?: boolean
}
export const debtor = (data: IDebtor) => {
    let invoiceData = invoice(data)

    let debtorData = new ServiceParameters({
        addressUnreachable: data.addressUnreachable,
        emailUnreachable: data.emailUnreachable,
        mobileUnreachable: data.mobileUnreachable,
        landlineUnreachable: data.landlineUnreachable,
        faxUnreachable: data.faxUnreachable
    })
    debtorData.setGroupType('addressUnreachable', 'Address')
    debtorData.setGroupType('emailUnreachable', 'Email')
    debtorData.setGroupType('mobileUnreachable', 'Phone')
    debtorData.setGroupType('landlineUnreachable', 'Phone')
    debtorData.setGroupType('faxUnreachable', 'Phone')

    invoiceData.addParameter(debtorData)

    return invoiceData
}
