import { Payload } from '../../../Models/ITransaction';
import { IBillingRecipient, IShippingRecipient } from '../../Afterpay/Model/Recipient';
import { ITinkaArticle } from './Article';
export interface IPay extends Payload {
    customer?: {
        firstName: string;
        lastName: string;
        initials?: string;
        gender?: string;
        dateOfBirth?: string;
    };
    paymentMethod: string;
    articles: ITinkaArticle[];
    billing: IBillingRecipient;
    shipping?: IShippingRecipient;
    deliveryMethod: string;
    deliveryDate?: string;
}
export declare const Pay: (data: any) => any;
