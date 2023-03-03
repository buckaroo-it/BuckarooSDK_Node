export interface ICreditNote {
    originalInvoiceNumber: string
    invoiceDate: string
    invoiceAmount: string
    invoiceAmountVAT: string
    sendCreditNoteMessage: string
}

export const creditNote = (data: ICreditNote) => {
    return {
        originalInvoiceNumber: data.originalInvoiceNumber,
        invoiceDate: data.invoiceDate,
        invoiceAmount: data.invoiceAmount,
        invoiceAmountVAT: data.invoiceAmountVAT,
        sendCreditNoteMessage: data.sendCreditNoteMessage
    }
}
