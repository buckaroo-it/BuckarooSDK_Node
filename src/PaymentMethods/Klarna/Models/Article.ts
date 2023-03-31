import IArticle from '../../../Models/Services/IArticle'

export interface IKlarnaArticle extends IArticle {
    identifier: string
    quantity: number
    price: number
    vatPercentage: number
}
