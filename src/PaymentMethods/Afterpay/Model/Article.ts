import IArticle, { Article } from '../../../Models/Interfaces/IArticle';

export interface IAfterPayArticle extends Partial<IArticle> {
    type?: string;
    imageUrl?: string;
    url?: string;
    refundType?: 'Refund' | 'Return';
    marketPlaceSellerId?: string;
}
export class AfterPayArticle<Interface extends IAfterPayArticle> extends Article {
    constructor(article: Interface) {
        super(article);
    }
    get price(): number {
        return this.get('grossUnitPrice');
    }
    set price(price: number) {
        this.set('grossUnitPrice', price);
    }
    set imageUrl(imageUrl: string) {
        this.set('imageUrl', imageUrl);
    }
    set url(url: string) {
        this.set('url', url);
    }
    set refundType(refundType: string) {
        this.set('refundType', refundType);
    }
    set marketPlaceSellerId(marketPlaceSellerId: string) {
        this.set('marketPlaceSellerId', marketPlaceSellerId);
    }
}
