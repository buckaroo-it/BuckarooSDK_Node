import { Article as ArticleClass, IArticle } from '../../../Models';

export interface IKlarnaArticle extends IArticle {
    imageUrl?: string;
    productUrl?: string;
}

export default class Article extends ArticleClass {
    get description(): string {
        return this.get('title');
    }

    set description(description: string) {
        this.set('title', description);
    }

    get vatPercentage(): number {
        return this.get('vat');
    }

    set vatPercentage(value: number) {
        this.set('vat', value);
    }

    get identifier(): string {
        return this.get('number');
    }

    set identifier(identifier: string) {
        this.set('number', identifier);
    }

    set imageUrl(imageUrl: string) {
        this.set('imageUrl', imageUrl);
    }

    set productUrl(productUrl: string) {
        this.set('productUrl', productUrl);
    }

    set(name: string, value: any, hidden: boolean = false): this {
        this.defineProperty(`article${name.charAt(0).toUpperCase() + name.slice(1)}`, value, hidden);
        return this;
    }
}
