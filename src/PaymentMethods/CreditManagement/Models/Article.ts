import IArticle from '../../../Models/Services/IArticle'

export interface ICreditArticle {
    type: 'Regular' | 'SubTotal' | 'Discount' | 'TotalAmountExVat' | 'TotalVat' | 'TotalAmount'
    productName: string
    quantity: number
    pricePerUnit: number
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
