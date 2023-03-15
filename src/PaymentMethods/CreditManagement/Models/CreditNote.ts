
import { ITransaction } from '../../../Models/ITransaction'

export interface ICreditNote extends ITransaction {
    originalInvoiceNumber: string
    invoiceDate: string
    invoiceAmount: string
    invoiceAmountVAT: string
    sendCreditNoteMessage: string
}


