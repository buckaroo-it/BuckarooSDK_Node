import { ServiceParameters } from '../../../Utils/ServiceParameter'
import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'

export interface IAddOrUpdateProductLines extends ITransaction {
    invoiceKey: string
    articles: ICreditArticle[]
}
export const AddOrUpdateProductLines = (data) => {

    data.articles = new ServiceParameters(data.articles)
    data.articles.groupType = 'ProductLine'

    data.articles.makeCountable()

    data.articles.setKeys({
        identifier: 'ProductId',
        description: 'ProductName',
        price: 'PricePerUnit'
    })

    return data
}
