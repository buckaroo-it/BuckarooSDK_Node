export type ITinkaArticle = {
    /**
     *  0 - Unknown, 1 - Article, 2 - GiftCard, 3 - Discount
     */
    type?: 0 | 1 | 2 | 3
    quantity: string
    unitCode: string
    description: string
    brand: string
    manufacturer: string
    unitGrossPrice: number
    color?: string
    size?: string
}
