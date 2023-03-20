import { IKlarnaAddress } from './Address'
import { IPerson } from './Person'
import IPhone from "../../../Models/Services/IPhone";

export declare interface IBillingRecipient {
    recipient: IPerson
    address: IKlarnaAddress
    email: string
    phone: IPhone
}
export interface IShippingRecipient {
    recipient: IPerson
    address: IKlarnaAddress
    email: string
    phone?: IPhone
}
