import { ServiceParameters } from '../../../Utils/ServiceParameter'
import { ICreditArticle } from './Article'
import { ITransaction } from '../../../Models/ITransaction'

export interface IAddOrUpdateProductLines extends ITransaction {
    invoiceKey: string
    articles: ICreditArticle[]
}
export const AddOrUpdateProductLines = (data: IAddOrUpdateProductLines) => {
    let services = new ServiceParameters({
        invoiceKey: data.invoiceKey,
        articles: data.articles
    })
    services.setGroupType('ProductLine', 'articles').makeCountable()

    services.find('articles')?.setKeys({
        identifier: 'ProductId',
        description: 'ProductName',
        price: 'PricePerUnit'
    })

    return services
}
