import IArticle from '../../../Models/Services/IArticle'

export interface ICreditArticle extends IArticle {
    type: 'Regular' | 'SubTotal' | 'Discount' | 'TotalAmountExVat' | 'TotalVat' | 'TotalAmount'
    identifier: string
    description: string
    quantity: number
    price: number
    totalVat: number
    vatPercentage: number
    productGroupName?: string
    productGroupOrderIndex?: number
    productOrderIndex?: number
    unitOfMeasurement?: string
    discountPercentage?: number
    totalDiscount?: number
    totalAmountExVat?: number
    totalAmount?: number
}
