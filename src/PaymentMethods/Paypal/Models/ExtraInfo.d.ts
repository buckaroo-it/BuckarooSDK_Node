import { Payload } from '../../../Models/ITransaction';
export interface IExtraInfo extends Payload {
    costumer: {
        name: string;
    };
    phone: {
        mobile: string;
    };
    address: {
        street: string;
        street2: string;
        city: string;
        state: string;
        country: string;
        zipcode: string;
    };
    noShipping?: number;
    addressOverride: boolean;
}
export declare const extraInfo: (data: IExtraInfo) => {
    name: string;
    street1: string;
    street2: string;
    cityName: string;
    stateOrProvince: string;
    country: string;
    postalCode: string;
    noShipping: number | undefined;
    addressOverride: boolean;
    phone: string;
};
