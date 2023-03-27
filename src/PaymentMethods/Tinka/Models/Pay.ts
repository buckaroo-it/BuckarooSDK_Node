import { Payload } from '../../../Models/ITransaction'

import { ServiceParameters } from '../../../Utils/ServiceParameters'
import {
    adaptBilling,
    adaptShipping,
    IBillingRecipient,
    IShippingRecipient
} from '../../Afterpay/Model/Recipient'

import { ITinkaArticle, TinkaArticle } from './Article'
export interface IPay extends Payload {
    customer?: {
        firstName: string
        lastName: string
        initials?: string
        gender?: string
        dateOfBirth?: string
    }
    paymentMethod: string
    articles: ITinkaArticle[]
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    deliveryMethod: string
    deliveryDate?: string
}

export const Pay = (data) => {
    data = new ServiceParameters(data)
    if (data.billing) data.billing = adaptBilling(data.billing)
    if (data.shipping) data.shipping = adaptShipping(data.shipping || data.billing)
    data.setParameterKeys({
        lastNamePrefix: 'PrefixLastName'
    })
    if (data.articles) data.articles = TinkaArticle(data.articles)
    return data
}
