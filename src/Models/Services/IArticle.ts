import { Adapters } from '../Adapters'
import { ServiceParameters } from '../../Utils/ServiceParameter'

export default interface IArticle {
    identifier?: string
    type?: string
    brand?: string
    manufacturer?: string
    unitCode?: string
    quantity?: Number
    price: Number
    vatCategory?: Number
    vatPercentage?: Number
    description?: string
}
export function ArticleService(articles, adapters?: Adapters) {
    articles = new ServiceParameters(articles)
    articles.makeCountable()
    articles.groupType = adapters?.groupType || 'Article'
    if (adapters?.keys) articles.setParameterKeys(adapters.keys)

    return articles
}
