export type IConfiguration = {
    name?: string
    schemeKey?: string
    invoiceNumberPrefix?: string
    invoiceDescriptionFormat?: string
    dueDateDays?: number
    allowedServices?: string
    generateInvoiceSpecification?: boolean
    skipPayPerEmail?: boolean
}
