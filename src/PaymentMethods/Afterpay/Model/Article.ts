import IArticle from '../../../Models/Services/IArticle'

export interface IAfterPayArticle extends IArticle {
    type?: 'PhysicalArticle' | 'DigitalArticle' | 'Giftcard' | 'Discount' | 'ShippingFee' | 'Surcharge' | 'Info' | 'ShippingFees'
    imageUrl?: string
    url?: string
    refundType?:'Refund' | 'Return'
    marketPlaceSellerId?: string
}