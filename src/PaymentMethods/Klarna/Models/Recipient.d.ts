import { IKlarnaAddress } from './Address';
import { IPerson } from './Person';
import { IPhone } from './Phone';
export declare interface IBillingRecipient {
    recipient: IPerson;
    address: IKlarnaAddress;
    email: string;
    phone: IPhone;
}
export interface IShippingRecipient {
    recipient: IPerson;
    address: IKlarnaAddress;
    email: string;
    phone?: IPhone;
}
