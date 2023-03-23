import { Payload } from '../../../Models/ITransaction';
import { IBillingRecipient } from '../../Afterpay/Model/Recipient';
import { IBillinkArticle } from './Article';
export interface IPay extends Payload {
    billing: IBillingRecipient;
    shipping?: Omit<IBillingRecipient, 'phone'> & Partial<Pick<IBillingRecipient, 'phone'>>;
    articles: IBillinkArticle[];
    trackandtrace?: string;
    vATNumber?: string;
    summaryImageUrl?: string;
    bankAccount?: string;
    bankCode?: string;
    yourReference?: string;
    ourReference?: string;
}
export declare const payServices: (data: any) => any;
