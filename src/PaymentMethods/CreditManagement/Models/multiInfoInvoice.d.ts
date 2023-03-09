import { ServiceParameterList } from '../../../Utils/ServiceParameter';
export interface IMultiInfoInvoice {
    invoice: string;
    invoices?: {
        invoiceNumber: string;
    }[];
}
export declare const multiInfoInvoice: (data: IMultiInfoInvoice) => ServiceParameterList;
