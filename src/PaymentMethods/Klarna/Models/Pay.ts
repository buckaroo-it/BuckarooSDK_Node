import { IKlarnaArticle } from './Article'
import { IBillingRecipient, IShippingRecipient } from './Recipient'
import { Payload } from '../../../Models/ITransaction'
import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IPay extends Payload {
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    articles: IKlarnaArticle[]
}

export const Services = (data: IPay) => {
    let serviceData = new ServiceParameters({
        billing: data.billing,
        shipping: data.shipping || data.billing,
        articles: data.articles
    })
    serviceData.setObjectGroupTypes({
        billing: 'BillingCostumer',
        shipping: 'ShippingCustomer',
        articles: 'Article'
    })
    serviceData.articles.setKeys({
        price: 'grossUnitPrice'
    })

    serviceData.articles.setCountable('articles')

    return serviceData
}
