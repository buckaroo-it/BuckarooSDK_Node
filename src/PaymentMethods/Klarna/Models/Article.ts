import { Article } from '../../../Models/Interfaces/IArticle'
export class KlarnaArticle extends Article {
    get price() {
        return this.get('grossUnitPrice')
    }
    set price(price: number) {
        this.set('grossUnitPrice', price)
    }
}
