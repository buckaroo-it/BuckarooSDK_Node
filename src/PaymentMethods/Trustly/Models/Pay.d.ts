import { Payload } from '../../../Models/ITransaction';
export interface IPay extends Payload {
    country: 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'NL' | 'NO' | 'PL' | 'SE' | 'GB';
    customer: {
        firstName: string;
        lastName: string;
    };
}
export declare const Pay: (data: any) => {
    customerCountryCode: any;
    customerFirstName: any;
    customerLastName: any;
};
