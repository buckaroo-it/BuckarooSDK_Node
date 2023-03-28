import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'
import {ServiceParameters} from "../../../Utils/ServiceParameters";

export interface IAddOrUpdateProductLines extends ITransaction {
    invoiceKey: string
    articles: ICreditArticle[]
}
export const AddOrUpdateProductLines = (data) => {
    const articleService = new ServiceParameters(data)
    articleService.setCountable(['articles'])
    articleService.setKeys({
        identifier:'ProductId',
            description:'ProductName',
            price:'PricePerUnit'
    })
    return articleService.data
}
