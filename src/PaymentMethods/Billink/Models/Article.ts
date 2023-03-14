import IArticle from '../../../Models/Services/IArticle'
import {ServiceParameters} from "../../../Utils/ServiceParameter";

export interface IBillinkArticle extends IArticle {
    quantity: Number
    identifier:string
    description:string
    vatPercentage:Number
    grossUnitPriceIncl?:Number
    grossUnitPriceExclL?:Number
}

export const articles = (data:IBillinkArticle[]) => {
    let articleData = new ServiceParameters(data)

    articleData.groupType = 'Article'
    articleData.makeCountable()

    return articleData
}