import IArticle, {Article} from "../../../Models/Interfaces/IArticle";

export interface ITinkaArticle extends IArticle {
    color?: string
    size?: string
}
export class TinkaArticle extends Article {
    set color(value: string) {
        this.set('color', value)
    }
    set price(value: number) {
        this.set('unitGrossPrice', value)
    }
    set size(value: string) {
        this.set('size', value)
    }
}
