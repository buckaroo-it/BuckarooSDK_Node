import IArticle from '../../../Models/Services/IArticle'
export interface IBillinkArticle extends IArticle {
    grossUnitPriceIncl?: Number
    grossUnitPriceExclL?: Number
}
