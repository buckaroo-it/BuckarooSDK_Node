import IArticle, { Article } from '../../../Models/Interfaces/IArticle'
export interface ICreditArticle extends Partial<IArticle> {
    totalVat: number
    productLine?: string
    productGroupName?: string
    productGroupOrderIndex?: number
    productOrderIndex?: number
    unitOfMeasurement?: string
    discountPercentage?: number
    totalDiscount?: number
    totalAmountExVat?: number
    totalAmount?: number
}
export class CreditArticle extends Article implements ICreditArticle {
    set identifier(value: string) {
        this.set('productId', value)
    }
    set description(value: string) {
        this.set('productName', value)
    }
    set price(value: number) {
        this.set('pricePerUnit', value)
    }
    set productLine(value: string) {
        this.set('productLine', value)
    }
    set productGroupName(value: string) {
        this.set('productGroupName', value)
    }
    set productGroupOrderIndex(value: number) {
        this.set('productGroupOrderIndex', value)
    }
    set productOrderIndex(value: number) {
        this.set('productOrderIndex', value)
    }
    set unitOfMeasurement(value: string) {
        this.set('unitOfMeasurement', value)
    }
    set discountPercentage(value: number) {
        this.set('discountPercentage', value)
    }
    set totalDiscount(value: number) {
        this.set('totalDiscount', value)
    }
    set totalVat(value: number) {
        this.set('totalVat', value)
    }
    set totalAmountExVat(value: number) {
        this.set('totalAmountExVat', value)
    }
    set totalAmount(value: number) {
        this.set('totalAmount', value)
    }
}
