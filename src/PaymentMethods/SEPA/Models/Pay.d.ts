import { Payload } from '../../../Models/ITransaction';
export interface IPay extends Payload {
    bic: string;
    iban: string;
    collectDate: string;
    mandateReference?: string;
    mandateDate?: string;
    customer: {
        name: string;
    };
}
export declare const Pay: (data: IPay) => {
    customerbic: string;
    customerIBAN: string;
    collectDate: string;
    mandateReference: string | undefined;
    mandateDate: string | undefined;
    customeraccountname: string;
};
