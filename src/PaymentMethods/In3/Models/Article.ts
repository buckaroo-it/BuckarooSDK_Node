import IArticle, { Article } from '../../../Models/Interfaces/IArticle';

export interface IIn3Article extends IArticle {
    category?: string;
    url?: string;
    quantityDescription?: string;
}
export class In3Article extends Article implements In3Article {
    set category(value: string) {
        this.set('category', value);
    }
    get price() {
        return this.get('grossUnitPrice');
    }
    set price(value: number) {
        this.set('grossUnitPrice', value);
    }
    set url(value: string) {
        this.set('url', value);
    }
    set quantityDescription(value: string) {
        this.set('quantityDescription', value);
    }
}
