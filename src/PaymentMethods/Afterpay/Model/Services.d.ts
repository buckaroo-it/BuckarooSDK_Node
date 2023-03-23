import { IAfterPayArticle } from './Article';
import { IBillingRecipient, IShippingRecipient } from './Recipient';
import { Payload } from '../../../Models/ITransaction';
import { IPAddress } from '../../../Utils/Types';
export interface IPay extends Payload {
    clientIP: IPAddress | string;
    billing: IBillingRecipient;
    shipping?: IShippingRecipient;
    articles: IAfterPayArticle[];
    merchantImageUrl?: string;
    summaryImageUrl?: string;
    bankAccount?: string;
    bankCode?: string;
    yourReference?: string;
    ourReference?: string;
}
export declare const Pay: (data: any) => any;
