import { IAfterPayArticle } from './Article';
import { IBillingRecipient } from './Recipient';
import { ClientIP, Payload } from '../../../Models/ITransaction';
import { ServiceParameterList } from "../../../Utils/ServiceParameter";
export interface IPay extends Payload {
    clientIP: ClientIP;
    billing: IBillingRecipient;
    shipping?: Omit<IBillingRecipient, 'phone'> & Partial<Pick<IBillingRecipient, 'phone'>>;
    articles: IAfterPayArticle[];
    merchantImageUrl?: string;
    summaryImageUrl?: string;
    bankAccount?: string;
    bankCode?: string;
    yourReference?: string;
    ourReference?: string;
}
export declare const Services: (data: IPay) => ServiceParameterList;
