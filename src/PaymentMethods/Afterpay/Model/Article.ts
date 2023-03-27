import IArticle from '../../../Models/Services/IArticle'

export interface IAfterPayArticle extends IArticle {
    // grossUnitPrice: Number
    imageUrl?: string
    quantity: Number
    url?: string
    identifier: string
    marketPlaceSellerId?: string
}
export interface IAfterPayArticleRefund extends IAfterPayArticle {
    refundType?:'Refund' | 'Return'
}