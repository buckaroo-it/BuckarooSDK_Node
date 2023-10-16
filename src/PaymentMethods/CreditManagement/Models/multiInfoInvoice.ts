import IRequest from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';

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
