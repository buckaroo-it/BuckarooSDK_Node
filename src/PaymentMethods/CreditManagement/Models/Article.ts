import IArticle from '../../../Models/Services/IArticle'

export interface ICreditArticle extends IArticle {
    productGroupName: string
    productGroupOrderIndex: Number
    productOrderIndex: Number
    unitOfMeasurement: string
    discountPercentage: Number
    totalDiscount: Number
    totalVat: Number
    totalAmountExVat: Number
    totalAmount: Number
    type: 'Regular' | 'SubTotal' | 'Discount' | 'TotalAmountExVat' | 'TotalVat' | 'TotalAmount'
}
