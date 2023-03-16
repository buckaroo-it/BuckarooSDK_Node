import { CreditArticle, ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'

export interface IAddOrUpdateProductLines extends ITransaction {
    invoiceKey: string
    articles: ICreditArticle[]
}
export const AddOrUpdateProductLines = (data) => {
    data.articles = CreditArticle(data.articles)
    return data
}
