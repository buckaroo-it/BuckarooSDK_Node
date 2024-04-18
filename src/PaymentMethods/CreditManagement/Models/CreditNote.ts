import { IRequest, ServiceParameter } from "../../../Models";

export interface ICreditNote extends IRequest {
    originalInvoiceNumber: string;
    invoiceDate: string;
    invoiceAmount: string;
    invoiceAmountVAT: string;
    sendCreditNoteMessage: string;
}

export class CreditNote extends ServiceParameter implements ICreditNote {
    set originalInvoiceNumber(value: string) {
        this.set("originalInvoiceNumber", value);
    }

    set invoiceDate(value: string) {
        this.set("invoiceDate", value);
    }

    set invoiceAmount(value: string) {
        this.set("invoiceAmount", value);
    }

    set invoiceAmountVAT(value: string) {
        this.set("invoiceAmountVAT", value);
    }

    set sendCreditNoteMessage(value: string) {
        this.set("sendCreditNoteMessage", value);
    }
}
