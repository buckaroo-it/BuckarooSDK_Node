export interface IArticle {
    identifier: string
    quantity: number
    price: number
    vatPercentage: number
    description?: string
}
export default class Article {
    identifier: string
    quantity: number
    grossUnitPrice: number
    vatPercentage: number
    description?: string
    constructor(data: IArticle) {
        this.grossUnitPrice = data.price
        this.identifier = data.identifier
        this.quantity = data.quantity
        this.vatPercentage = data.vatPercentage
        this.description = data.description
    }

    groupType(): string {
        return 'Article'
    }

    groupID(id: string): number {
        return Number(id) + 1
    }
}

export class Articles {
    articles: Article[] = []
    constructor(data) {
        if (!Array.isArray(data)) {
            data = [data]
        }
        for (const dataKey in data) {
            this.articles.push(new Article(data[dataKey]))
        }
        if (this.articles?.length === 0) {
            throw new Error('Missing Parameter:articles')
        }
    }
}
