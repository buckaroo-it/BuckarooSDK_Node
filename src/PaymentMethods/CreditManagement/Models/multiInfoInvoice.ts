import { ServiceParameterList } from '../../../Utils/ServiceParameter'

export interface IMultiInfoInvoice {
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
export const multiInfoInvoice = (data: IMultiInfoInvoice) => {
    let invoiceInfos = new ServiceParameterList({
        invoices: data.invoices
    })
    invoiceInfos.setCountable('invoices')
    return invoiceInfos
}
