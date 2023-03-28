import { IAfterPayArticle } from './Article'
import { Payload } from '../../../Models/ITransaction'
import { IPAddress } from '../../../Utils/Types'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import {IBillingRecipient, IShippingRecipient} from "./Recipient";

export interface IPay extends Payload {
    clientIP: IPAddress | string
    billing: IBillingRecipient
    shipping?: IShippingRecipient
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

    let customerKeys = {
        address:{
            houseNumber: "streetNumber",
            houseNumberAdditional: "streetNumberAdditional",
            zipcode: "postalCode"
        },
        recipient:{
            gender:"salutation",
            title: "salutation",
            chamberOfCommerce: "identificationNumber"
        },
        phone:{
            landline: "phone",
            mobile: "mobilePhone"
        }
    }
    services.setKeys({
        articles:{
            price:'grossUnitPrice',
        },
        billing:customerKeys,
        shipping:customerKeys
    })

    return services.data
}