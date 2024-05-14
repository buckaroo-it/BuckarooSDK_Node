import { Article } from '../../../Models';

export class KlarnaArticle extends Article {
    get price() {
        return this.get('grossUnitPrice');
    }

    set price(price: number) {
        this.set('grossUnitPrice', price);
    }
}
