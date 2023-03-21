import IArticle from '../../../Models/Services/IArticle'
export interface IBillinkArticle extends IArticle {
    quantity: Number
    identifier: string
    description: string
    vatPercentage: Number
    grossUnitPriceIncl?: Number
    grossUnitPriceExclL?: Number
}
