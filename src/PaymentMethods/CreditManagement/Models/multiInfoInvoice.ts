import {ServiceParameters} from "../../../Utils/Types";

export interface IMultiInfoInvoice extends ServiceParameters{
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
