import { ServiceParameterList } from '../../../Utils/ServiceParameter'
import { ITransaction } from '../../../Models/ITransaction'

export interface ICreditNote extends ITransaction {
    originalInvoiceNumber: string
    invoiceDate: string
    invoiceAmount: string
    invoiceAmountVAT: string
    sendCreditNoteMessage: string
}

export const creditNote = (data: ICreditNote) => {
    return new ServiceParameterList({
        originalInvoiceNumber: data.originalInvoiceNumber,
        invoiceDate: data.invoiceDate,
        invoiceAmount: data.invoiceAmount,
        invoiceAmountVAT: data.invoiceAmountVAT,
        sendCreditNoteMessage: data.sendCreditNoteMessage
    })
}
