import { ServiceParameterList} from '../../../Utils/ServiceParameter'

export const multiInfoInvoice = (data: { invoice: string[] }) => {
    let invoiceInfos = new ServiceParameterList({
        invoice:data.invoice.map((i) => { return { InvoiceNumber:i }})
    })
    invoiceInfos.setCountable('invoice')
    return invoiceInfos
}
