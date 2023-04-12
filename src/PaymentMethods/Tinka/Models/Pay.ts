import { Payload } from '../../../Models/ITransaction'
import { ITinkaArticle } from './Article'
import {ITinkaAddress} from "./Address";
import Gender from "../../../Constants/Gender";
export interface IPay extends Payload {
    paymentMethod: string
    deliveryMethod: string
    deliveryDate?: string
    articles: { article: ITinkaArticle }[]
    billingCustomer: {
        email: string,
        phone?: string,
        prefixLastName?: string,
    } & ITinkaAddress
    shippingCustomer?:{
        externalName: false
    } & ITinkaAddress
    dateOfBirth?: string
    firstName?: string
    gender?:Gender
    initials?: string
    lastName?: string
}