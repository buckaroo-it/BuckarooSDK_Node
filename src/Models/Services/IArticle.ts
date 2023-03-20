import { Adapters } from '../Adapters'
import { ServiceParameters } from '../../Utils/ServiceParameter'

export default interface IArticle {
    identifier: string
    type?: string
    brand?: string
    manufacturer?: string
    unitCode?: string
    quantity: Number
    price: Number
    vatCategory?: Number
    vatPercentage?: Number
    description?: string
}
export function ArticleService(_articles, adapters?: Adapters) {
    let articles:ServiceParameters = new ServiceParameters(_articles)
    articles.makeCountable()
    articles.setGroupType(adapters?.groupType || 'Article')
    if (adapters?.keys) articles.setParameterKeys(adapters.keys)

    return articles
}
