import { Payload } from '../../../Models/ITransaction'
import { Address } from '../../Afterpay/Model/Recipient'
import { IBillinkArticle } from './Article'
import { ModelStrategy } from '../../../Utils/ModelStrategy'
import IPerson from '../../../Models/Services/IPerson'
import ICompany from '../../../Models/Services/ICompany'
import IPhone from '../../../Models/Services/IPhone'
import { ICustomer } from '../../../Models/Services/ICustomer'
import RecipientCategory from '../../../Constants/RecipientCategory'
import Gender from '../../../Constants/Gender'

export declare interface Recipient extends ICustomer {
    category: RecipientCategory.B2C | RecipientCategory.B2B
    gender: Gender
}
export declare interface Customer {
    recipient: Recipient & (IPerson | Omit<ICompany, 'identificationNumber' | 'vatApplicable'>)
    address: Address
    phone?: IPhone
    email: string
}

export interface Pay {
    billing: Customer
    shipping?: Customer
    articles: IBillinkArticle[]
    trackandtrace?: string
    vATNumber?: string
    summaryImageUrl?: string
    bankAccount?: string
    bankCode?: string
    ourReference?: string
}
export type IPay = Pay & Payload

export class BillinkModelStrategy extends ModelStrategy<Pay> {
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
                zipcode: 'postalCode'
            },
            recipient: {
                gender: 'salutation',
                companyName: 'careOf',
                title: 'salutation'
            },
            phone: {
                landline: 'phone',
                mobile: 'mobilePhone'
            }
        }
        this.keys = {
            articles: {
                price: 'grossUnitPriceIncl',
                priceExcl: 'grossUnitPriceExcl'
            },
            billing: {
                address: {
                    houseNumber: 'streetNumber',
                    houseNumberAdditional: 'streetNumberAdditional',
                    zipcode: 'postalCode'
                },
                recipient: {
                    gender: 'salutation',
                    companyName: 'careOf',
                    title: 'salutation'
                },
                phone: {
                    landline: 'phone',
                    mobile: 'mobilePhone'
                }
            },
            shipping: customerKeys
        }
        this.countable = ['articles']
    }
}
