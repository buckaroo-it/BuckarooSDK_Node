import { IAfterPayArticle } from './Article'
import { Customer } from "./Customer";
import { Payload } from '../../../Models/ITransaction'
import { IPAddress } from '../../../Utils/Types'
import { ServiceParameters } from '../../../Utils/ServiceParameters'

export interface IPay extends Payload {
    clientIP: IPAddress | string
    billing: Customer
    shipping?: Customer
    articles: IAfterPayArticle[]
    bankAccount?: string
    bankCode?: string
    merchantImageUrl?: string
    summaryImageUrl?: string
    yourReference?: string
    ourReference?: string
}

export const Services = (data:IPay) => {
    const services = new ServiceParameters(data)
    if(services.data.billing){
        services.data.shipping = services.data.shipping || {...services.data.billing}
    }
    services.setGroupTypes({
        billing:'BillingCustomer',
        shipping:'ShippingCustomer',
        articles:'Article'
    })
    services.setCountable(['articles'])
    services.setKeys({
        articles:{
            price:'grossUnitPrice',
        }
    })

    return services.data
}