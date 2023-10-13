import { IPaymentRequest } from '../../../Models/IRequest';

export interface IExtraInfo extends IPaymentRequest {
    customeraccountname: string;
    customerBIC?: string;
    customerIBAN: string;
    collectDate: string;
    mandateReference?: string;
    mandateDate?: string;
    customerName?: string;
    customerCode?: string;
    customerReferencePartyCode?: string;
    customerReferencePartyName?: string;
    houseNumberSuffix: string;
    contractID: string;
}
