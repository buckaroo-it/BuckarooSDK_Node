import { ServiceParameterList} from '../../../Utils/ServiceParameter'

export const multiInfoInvoice = (data: { invoices: string[] }) => {
    let invoiceInfos = new ServiceParameterList({
        invoices:data.invoices.map((i) => { return { InvoiceNumber:i }})
    })
    invoiceInfos.setCountable('invoices')
    return invoiceInfos
}
