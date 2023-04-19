import { ITransaction } from '../../../Models/ITransaction'

export interface CreditNote {
    originalInvoiceNumber: string
    invoiceDate: string
    invoiceAmount: string
    invoiceAmountVAT: string
    sendCreditNoteMessage: string
}
export type ICreditNote = CreditNote & ITransaction
