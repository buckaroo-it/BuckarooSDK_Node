import { IKlarnaArticle } from './Article';
import { IBillingRecipient, IShippingRecipient } from './Recipient';
import { Payload } from '../../../Models/ITransaction';
export interface IPay extends Payload {
    billing: IBillingRecipient;
    shipping?: IShippingRecipient;
    articles: IKlarnaArticle[];
}
export declare const Pay: (data: any) => any;
