import { IKlarnaArticle } from './Article'
import { IBillingRecipient, IShippingRecipient } from './Recipient'
import { Payload } from '../../../Models/ITransaction'
import { ServiceParameterList } from '../../../Utils/ServiceParameter'

export interface IPay extends Payload {
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    articles: IKlarnaArticle[]
}

export const Services = (data: IPay) => {
    let serviceData = new ServiceParameterList({
        billing: data.billing,
        shipping: data.shipping || data.billing,
        articles: data.articles
    })
    serviceData.setGroupTypes({
        billing: 'BillingCostumer',
        shipping: 'ShippingCustomer',
        articles: 'Article'
    })
    serviceData.list.articles.setKeys({
        price: 'grossUnitPrice'
    })

    serviceData.setCountable('articles')

    return serviceData
}
