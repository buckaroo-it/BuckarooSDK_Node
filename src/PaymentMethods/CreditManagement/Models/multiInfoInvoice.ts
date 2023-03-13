import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IMultiInfoInvoice {
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
export const multiInfoInvoice = (data: IMultiInfoInvoice) => {
    let invoiceInfos = new ServiceParameters({
        invoices: data.invoices
    })
    invoiceInfos.find('invoices')?.makeCountable()
    return invoiceInfos
}
