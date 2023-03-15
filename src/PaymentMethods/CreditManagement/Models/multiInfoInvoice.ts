import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IMultiInfoInvoice {
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
export const multiInfoInvoice = (data) => {
    data.invoices = new ServiceParameters(data.invoices)
    data.invoices.makeCountable()
    return data
}
