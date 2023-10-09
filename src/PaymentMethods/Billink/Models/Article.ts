import IArticle, { Article as ArticleClass } from '../../../Models/Interfaces/IArticle'
export interface IBillinkArticle extends Partial<IArticle> {
    priceExcl: number
}
export class Article extends ArticleClass {
    set priceExcl(priceExcl: number) {
        this.set('grossUnitPriceExcl', priceExcl)
    }
    set price(price: number) {
        this.set('grossUnitPriceIncl', price)
    }
}

