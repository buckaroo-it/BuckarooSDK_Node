import { Payload } from '../../../Models/ITransaction';
export interface IPay extends Payload {
    costumer: {
        firstName: string;
        lastName: string;
    };
    email: string;
}
export declare const Pay: (data: IPay) => {
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
};
