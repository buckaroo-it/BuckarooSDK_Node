import { ServiceParameters } from '../../Utils/ServiceParameter'

export default interface IArticle {
    identifier: string
    type?: string | Number
    brand?: string
    manufacturer?: string
    unitCode?: string
    quantity: Number
    price: Number
    vatCategory?: Number
    vatPercentage?: Number
    description?: string
}
export type Adapters = {
    keys?: { [key: string]: string }
    groupType?: string
    groupId?: boolean | string | number
}
export function ArticleService(articlesData, adapters?: Adapters) {
    let articles: ServiceParameters = new ServiceParameters(articlesData)
    articles.makeCountable()
    articles.setGroupType(adapters?.groupType || 'Article')
    if (adapters?.keys) articles.setParameterKeys(adapters.keys)

    return articles
}
