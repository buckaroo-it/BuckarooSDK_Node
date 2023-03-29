import { Payload } from '../../../Models/ITransaction'
import {AfterPayPerson, IBillingRecipient, IShippingRecipient,AfterPayCompany} from '../../Afterpay/Model/Recipient'
import { IBillinkArticle } from './Article'
import { servicesStrategy as AfterPayStrategy } from '../../Afterpay/Model/Services'

interface Recipient extends Omit<IBillingRecipient, 'recipient'>{
    recipient: AfterPayPerson | AfterPayCompany
}
export interface IPay extends Payload {
    billing: Recipient
    shipping?: Recipient
    articles: IBillinkArticle[]
    trackandtrace?: string
    vATNumber?: string
    summaryImageUrl?: string
    bankAccount?: string
    bankCode?: string
    ourReference?: string
}

export const servicesStrategy = AfterPayStrategy
