import IArticle from '../../../Models/Services/IArticle'

export interface IAfterPayArticle extends IArticle {
    imageUrl?: string
    url?: string
    refundType?:'Refund' | 'Return'
    marketPlaceSellerId?: string
}