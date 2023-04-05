import IArticle from '../../../Models/Services/IArticle'
export interface IBillinkArticle extends Omit<IArticle,'brand'|'manufacturer'|'vatCategory' | 'type' | 'unitCode'> {
    priceExcl: number
}
