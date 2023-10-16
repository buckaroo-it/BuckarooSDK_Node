import { IIn3Article } from './Article';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { IRefundRequest } from '../../../Models/IRequest';

export interface IRefund extends IRefundRequest {
    merchantImageUrl: string;
    summaryImageUrl: string;
    articles: IIn3Article[];
}

export class Refund extends ServiceParameter {
    protected _countable: string[] = ['articles'];

    set merchantImageUrl(value: string) {
        this.set('merchantImageUrl', value);
    }

    set summaryImageUrl(value: string) {
        this.set('summaryImageUrl', value);
    }

    set articles(value: IIn3Article[]) {
        this.set('article', value);
    }
}
