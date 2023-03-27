
export default interface IArticle {
    identifier: string
    type: 'Unknown' | 'PhysicalArticle' | 'DigitalArticle' | 'Giftcard' | 'Discount' | 'ShippingFee' | 'Surcharge' | 'Info' | 'ShippingFees'
    brand?: string
    manufacturer?: string
    unitCode: string
    quantity: Number
    price: Number
    vatCategory: Number
    vatPercentage: Number
    description: string
}
