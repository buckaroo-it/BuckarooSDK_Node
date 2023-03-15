import { ServiceParameters } from '../../../Utils/ServiceParameter'
import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'
import {ArticleService} from "../../../Models/Services/IArticle";

export interface IAddOrUpdateProductLines extends ITransaction {
    invoiceKey: string
    articles: ICreditArticle[]
}
export const AddOrUpdateProductLines = (data) => {

    data.articles = ArticleService(data.articles, {
        keys: { identifier:'ProductId', description:'ProductName', price:'PricePerUnit'},
        groupId:true,
        groupType:'ProductLine'
    })

    return data
}
