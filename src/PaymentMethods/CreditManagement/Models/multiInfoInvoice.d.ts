import { ServiceParameters } from '../../../Utils/ServiceParameter';
export interface IMultiInfoInvoice {
    invoice: string;
    invoices?: {
        invoiceNumber: string;
    }[];
}
export declare const multiInfoInvoice: (data: ServiceParameters) => ServiceParameters;
