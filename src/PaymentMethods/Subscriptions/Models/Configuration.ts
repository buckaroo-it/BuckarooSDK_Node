export interface IConfiguration {
    name?:string,
    schemeKey?:string
    invoiceNumberPrefix?:string
    invoiceDescriptionFormat?:string
    dueDateDays?:Number
    allowedServices?:string
    generateInvoiceSpecification?:boolean
    skipPayPerEmail?:boolean
}