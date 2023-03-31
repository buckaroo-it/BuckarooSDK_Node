import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'

export interface AddOrUpdateProductLines {
    invoiceKey: string
    articles: ICreditArticle[]
}
export type IAddOrUpdateProductLines = AddOrUpdateProductLines & ITransaction
