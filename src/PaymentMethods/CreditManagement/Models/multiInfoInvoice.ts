import { ServiceParameter } from '../../../Utils/ServiceParameter'

export const multiInfoInvoice = (data: { invoice: string[] }) => {
    let invoiceInfos = new ServiceParameter(data.invoice, 'InvoiceNumbers')
    invoiceInfos['InvoiceNumbers'] = data.invoice.map(
        (i) => new ServiceParameter(i, 'InvoiceNumber')
    )
    invoiceInfos.makeCountable('InvoiceNumbers')
    data.invoice = invoiceInfos['InvoiceNumbers'].shift()['InvoiceNumber']
    return invoiceInfos
}
