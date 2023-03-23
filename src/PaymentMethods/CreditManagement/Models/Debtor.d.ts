import { IInvoice } from './Invoice';
import { ServiceParameters } from '../../../Utils/ServiceParameter';
export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean;
    emailUnreachable?: boolean;
    mobileUnreachable?: boolean;
    landlineUnreachable?: boolean;
    faxUnreachable?: boolean;
}
export declare const debtor: (data: ServiceParameters) => ServiceParameters;
export declare const debtorInfo: (data: ServiceParameters) => ServiceParameters;
