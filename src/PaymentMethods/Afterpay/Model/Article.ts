import IArticle, {ArticleModel} from '../../../Models/Services/IArticle'


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
    refundType?:'Return' | 'Refund'
}

export const articles = (data:IArticle[]) => {
    return ArticleModel(data,{
        keys: { price: 'grossUnitPrice'},
        groupType: 'Article',
        groupId:true
    })
}