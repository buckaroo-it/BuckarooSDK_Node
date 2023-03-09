import IAddress from "../../../Models/Services/IAddress";
export interface IKlarnaAddress extends Omit<IAddress, 'houseNumber' | 'zipcode' | 'houseNumberAdditional'> {
    country: string;
    street: string;
    streetNumber: string;
    streetNumberAdditional?: string;
    postalCode: string;
    city: string;
}
