import IArticle, { ArticleService } from '../../../Models/Services/IArticle'

export interface IAfterPayArticle extends IArticle {
    identifier: string
    description: string
    vatPercentage: Number
    quantity: Number
    imageUrl?: string
    url?: string
    type?:
        | 'PhysicalArticle'
        | 'DigitalArticle'
        | 'Giftcard'
        | 'Discount'
        | 'ShippingFee'
        | 'Surcharge'
        | 'Info'
        | 'ShippingFees'
    unitCode?: string
    marketPlaceSellerId?: string
    refundType?: 'Return' | 'Refund'
}

export const AfterPayArticle = (articles) => {
    return ArticleService(articles, {
        keys: { price: 'grossUnitPrice' }
    })
}
