import { IPaymentRequest } from '../../../Models/IRequest';
import IAddress from '../../../Models/Interfaces/IAddress';

export interface IExtraInfo extends IPaymentRequest {
    bic?: string;
    iban: string;
    collectDate?: string;
    mandateReference?: string;
    mandateDate?: string;
    customerReferencePartyCode?: string;
    customerReferencePartyName?: string;
    contractID: string;
    customer: {
        name: string;
    };
    address: IAddress;
}
