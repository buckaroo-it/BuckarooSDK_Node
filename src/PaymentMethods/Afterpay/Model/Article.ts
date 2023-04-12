
export type IAfterPayArticle =  {
        type?:
            | 'PhysicalArticle'
            | 'DigitalArticle'
            | 'Giftcard'
            | 'Discount'
            | 'ShippingFee'
            | 'Surcharge'
            | 'Info'
            | 'ShippingFees'
        imageUrl?: string
        url?: string
        refundType?: 'Refund' | 'Return'
        marketPlaceSellerId?: string
        identifier: string
        unitCode?: string
        quantity: number
        grossUnitPrice: number
        vatPercentage: number
        description: string
}
