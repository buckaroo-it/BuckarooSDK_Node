import { Payload } from '../../../Models/ITransaction'
import { AfterPayCustomer } from '../../Afterpay/Model/Customer'
import { ITinkaArticle } from './Article'
import IPerson from '../../../Models/Services/IPerson'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface Pay {
    customer?: Pick<IPerson, 'firstName' | 'lastName' | 'initials' | 'gender' | 'birthDate'>
    paymentMethod: string
    articles: ITinkaArticle[]
    billing: AfterPayCustomer
    shipping?: AfterPayCustomer
    deliveryMethod: string
    deliveryDate?: string
}
export type IPay = Pay & Payload
export class TinkaModelStrategy extends ModelStrategy<Pay> {
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
                lastNamePrefix: 'PrefixLastName',
                birthDate: 'dateOfBirth',
                category: false,
                vatApplicable: false,
                careOf: false,
                vatNumber: false,
                companyName: false,
                placeOfBirth: false,
                culture: false,
                title: false,
                chamberOfCommerce: false
            },
            phone: {
                landline: false,
                mobile: 'phone'
            }
        }

        this.keys = {
            customer: {
                birthDate: 'dateOfBirth'
            },
            articles: {
                price: 'UnitGrossPrice',
                vatCategory: false,
                vatPercentage: false,
                brand: false
            },
            billing: customerKeys,
            shipping: customerKeys
        }
        this.countable = ['articles']
    }
}
