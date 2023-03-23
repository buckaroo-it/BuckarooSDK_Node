import IAddress from '../../../Models/Services/IAddress';
import { ServiceParameters } from '../../../Utils/ServiceParameter';
import { Payload } from '../../../Models/ITransaction';
export interface IExtraInfo extends Payload {
    bic: string;
    iban: string;
    mandateReference?: string;
    mandateDate?: string;
    collectDate?: string;
    customer: {
        name: string;
        code: string;
        referenceParty: {
            code: string;
            name: string;
        };
    };
    address: IAddress;
    contractID: string;
}
export declare const ExtraInfo: (data: IExtraInfo) => {
    address: ServiceParameters;
    mandateReference: string | undefined;
    mandateDate: string | undefined;
    customerName: string;
    customerCode: string;
    customerReferencePartyCode: string;
    customerReferencePartyName: string;
    customerbic: string;
    customerIBAN: string;
    collectDate: string;
    customeraccountname: string;
};
