import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IMultiInfoInvoice {
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
export const multiInfoInvoice = (data: IMultiInfoInvoice) => {
    const services = new ServiceParameters(data)
    services.findParameter('invoices')?.makeCountable()
    return services
}
