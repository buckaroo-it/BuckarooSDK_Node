
export enum ArticleType {
    Unknown = 0,
    Article = 1,
    GiftCard = 2,
    Discount = 3
}

export type ITinkaArticle = {
    type?:ArticleType
    quantity: number
    unitCode: string
    description: string
    brand?: string
    manufacturer?: string
    unitGrossPrice: number
    color?: string
    size?: string
}
