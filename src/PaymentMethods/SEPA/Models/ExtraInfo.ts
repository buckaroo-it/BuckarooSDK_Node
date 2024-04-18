import { IAddress, IPaymentRequest } from '../../../Models';

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
