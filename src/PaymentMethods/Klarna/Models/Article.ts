import IArticle from "../../../Models/Services/IArticle";

export interface IKlarnaArticle extends Omit<IArticle,'price'> {
    identifier: string
    quantity: number
    grossUnitPrice: number
    vatPercentage: number
    description?: string
}