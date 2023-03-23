import { Payload } from "../../../Models/ITransaction";
import Gender from "../../../Constants/Gender";
export interface Invitation extends Payload {
    costumer: {
        firstName: string;
        lastName: string;
        gender: Gender;
    };
    merchantSendsEmail?: boolean;
    email: string;
    expirationDate?: string;
    paymentMethodsAllowed?: string;
    attachment?: string;
}
export declare const services: (data: Invitation) => {
    customerGender: Gender;
    customerFirstName: string;
    customerLastName: string;
    merchantSendsEmail: boolean | undefined;
    customerEmail: string;
    expirationDate: string | undefined;
    paymentMethodsAllowed: string | undefined;
    attachment: string | undefined;
};
