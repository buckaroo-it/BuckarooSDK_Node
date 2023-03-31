import { IAfterPayArticle } from './Article'
import { Payload } from '../../../Models/ITransaction'
import { IPAddress } from '../../../Utils/Types'
import { AfterPayCustomer } from './Recipient'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface Pay {
    clientIP: IPAddress | string
    billing: AfterPayCustomer
    shipping?: AfterPayCustomer
    articles: IAfterPayArticle[]
    bankAccount?: string
    bankCode?: string
    merchantImageUrl?: string
    summaryImageUrl?: string
    yourReference?: string
    ourReference?: string
}
export type IPay = Payload & Pay

export class AfterPayModelStrategy extends ModelStrategy<Pay> {
    constructor(data) {
        super(data)
        if (this.data.billing) {
            this.data.shipping = this.data.shipping || { ...this.data.billing }
        }
        this.groupTypes = {
            billing: 'BillingCustomer',
            shipping: 'ShippingCustomer',
            articles: 'Article'
        }
        let customerKeys = {
            address: {
                houseNumber: 'streetNumber',
                houseNumberAdditional: 'streetNumberAdditional',
                zipcode: 'postalCode',
                state: false
            },
            recipient: {
                vatApplicable: false,
                vatNumber: false,
                placeOfBirth: false,
                lastNamePrefix: false,
                culture: false,
                gender: 'salutation',
                title: 'salutation',
                chamberOfCommerce: 'identificationNumber'
            },
            phone: {
                landline: 'phone',
                mobile: 'mobilePhone'
            }
        }

        this.keys = {
            articles: {
                price: 'grossUnitPrice',
                manufacturer: false,
                vatCategory: false,
                brand: false
            },
            billing: customerKeys,
            shipping: customerKeys
        }
        this.countable = ['articles']
    }
}
