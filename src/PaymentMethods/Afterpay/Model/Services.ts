import { IAfterPayArticle } from './Article'
import { Payload } from '../../../Models/ITransaction'
import { IPAddress } from '../../../Utils/Types'
import { AfterPayCustomer } from './Recipient'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface ServiceParameters {
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
export type IPay = Payload & ServiceParameters

export class AfterPayModelStrategy extends ModelStrategy<ServiceParameters> {
    constructor(data) {
        super(data)
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
            },
            recipient: {
                gender: 'salutation',
                title: 'salutation',
                chamberOfCommerce: 'identificationNumber',
                careOf:undefined,
                placeOfBirth:undefined,
                lastNamePrefix:undefined,
                culture:undefined,
                vatApplicable:undefined,
                vatNumber:undefined,
            },
            phone: {
                landline: 'phone',
                mobile: 'mobilePhone',
                fax:undefined
            }
        }
        if (this.data.billing) {
            this.data.shipping = this.data.shipping || { ...this.data.billing }
        }
        this.keys = {
            articles: {
                price: 'grossUnitPrice',
                brand: undefined,
                manufacturer: undefined,
                vatCategory: undefined,
            },
            billing: customerKeys,
            shipping: customerKeys
        }
        this.countable = ['articles']
    }
}
