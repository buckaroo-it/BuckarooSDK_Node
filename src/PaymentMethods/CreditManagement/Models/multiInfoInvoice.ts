import { IRequest, ServiceParameter } from '../../../Models';

export interface IMultiInfoInvoice extends IRequest {
    invoice: string;
    invoices?: { invoiceNumber: string }[];
}

export class MultiInfoInvoice extends ServiceParameter {
    set invoices(value: { invoiceNumber: string }[]) {
        this.set('invoices', value);
    }

    protected getCountable() {
        return super.getCountable(['Invoices']);
    }
}
