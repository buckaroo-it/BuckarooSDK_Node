import IArticle, { ArticleService } from '../../../Models/Services/IArticle'

export interface ICreditArticle extends IArticle {
    type: 'Regular' | 'SubTotal' | 'Discount' | 'TotalAmountExVat' | 'TotalVat' | 'TotalAmount'
    identifier: string
    description: string
    quantity: Number
    price: Number
    totalVat: Number
    vatPercentage: Number
    productGroupName?: string
    productGroupOrderIndex?: Number
    productOrderIndex?: Number
    unitOfMeasurement?: string
    discountPercentage?: Number
    totalDiscount?: Number
    totalAmountExVat?: Number
    totalAmount?: Number
}
export const CreditArticle = (data: ICreditArticle) => {
    return ArticleService(data, {
        keys: { identifier: 'ProductId', description: 'ProductName', price: 'PricePerUnit' },
        groupId: true,
        groupType: 'ProductLine'
    })
}
