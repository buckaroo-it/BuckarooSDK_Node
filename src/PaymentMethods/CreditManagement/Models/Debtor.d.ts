import { IInvoice } from './Invoice';
import { ServiceParameterList } from '../../../Utils/ServiceParameter';
export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean;
    emailUnreachable?: boolean;
    mobileUnreachable?: boolean;
    landlineUnreachable?: boolean;
    faxUnreachable?: boolean;
}
export declare const debtor: (data: IDebtor) => ServiceParameterList;
