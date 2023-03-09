import IArticle from '../../../Models/Services/IArticle'

export interface IAfterPayArticle extends IArticle {
    identifier: string
    description: string
    grossUnitPrice: string
    vatPercentage: Number
    quantity: Number
    imageUrl?: string
    url?: string
    type:
        | 'PhysicalArticle'
        | 'DigitalArticle'
        | 'Giftcard'
        | 'Discount'
        | 'ShippingFee'
        | 'Surcharge'
        | 'Info'
        | 'ShippingFees'
    unitCode: string
    marketPlaceSellerId?: string
}
