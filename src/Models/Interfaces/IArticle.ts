import { Model } from '../Model';

export default interface IArticle {
    identifier: string;
    type: string;
    brand?: string;
    manufacturer?: string;
    unitCode: string;
    price: number;
    quantity: number;
    vatPercentage: number;
    vatCategory: string;
    description: string;
}

export class Article extends Model implements IArticle {
    set identifier(identifier: string) {
        this.set('identifier', identifier);
    }

    set type(type: string) {
        this.set('type', type);
    }

    set brand(brand: string) {
        this.set('brand', brand);
    }

    set manufacturer(manufacturer: string) {
        this.set('manufacturer', manufacturer);
    }

    set unitCode(unitCode: string) {
        this.set('unitCode', unitCode);
    }

    set price(price: number) {
        this.set('price', price);
    }

    set quantity(quantity: number) {
        this.set('quantity', quantity);
    }

    set vatPercentage(vatPercentage: number) {
        this.set('vatPercentage', vatPercentage);
    }

    set vatCategory(vatCategory: string) {
        this.set('vatCategory', vatCategory);
    }

    set description(description: string) {
        this.set('description', description);
    }
}
