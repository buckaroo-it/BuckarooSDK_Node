import IArticle  from "../../../Models/Services/IArticle";
import {ServiceParameter} from "../../../Utils/ServiceParameter";

export interface ICreditArticle extends IArticle {
    productGroupName:string
    productGroupOrderIndex:Number
    productOrderIndex:Number
    unitOfMeasurement:string
    discountPercentage:Number
    totalDiscount:Number
    totalVat:Number
    totalAmountExVat:Number
    totalAmount:Number
    type:'Regular' | 'SubTotal' | 'Discount' | 'TotalAmountExVat' | 'TotalVat' | 'TotalAmount'
}
export default class Article {
    private productId: any;
    private productName: any;
    private pricePerUnit: any;

    constructor(data) {
        for (const dataKey in data) {
            this[dataKey] = data[dataKey]
        }
        this.setKeys(data)
    }

    setKeys(data){
        this.productId = data.identifier
        delete this['identifier']
        this.productName = data.description
        delete this['description']
        this.pricePerUnit = data.price
        delete this['price']
    }
    groupType(): string {
        return 'Article'
    }

    groupID(id: string): number {
        return Number(id) + 1
    }
}

export class Articles {
    articles: any[] = []
    constructor(data) {
        if (!Array.isArray(data)) {
            data = [data]
        }
        let article;
        for (const dataKey in data) {
            article = new ServiceParameter(data[dataKey],dataKey)
            article.setGroupId(dataKey+1)
            this.articles.push(article)
        }
        if (this.articles?.length === 0) {
            throw new Error('Missing Parameter:articles')
        }
        console.log(this)
    }
    getData():ICreditArticle[]{
        return this.articles
    }
}
