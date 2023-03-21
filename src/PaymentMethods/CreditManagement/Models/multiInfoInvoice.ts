import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IMultiInfoInvoice {
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
export const multiInfoInvoice = (data: ServiceParameters) => {
    data.findParameter('invoices')?.makeCountable()
    return data
}
