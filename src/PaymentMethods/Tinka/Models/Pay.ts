import { Payload } from '../../../Models/ITransaction'
import { AfterPayCustomer } from '../../Afterpay/Model/Customer'
import { ITinkaArticle } from './Article'
import IPerson from '../../../Models/Services/IPerson'
type Pay = {
    customer?: Pick<IPerson, 'firstName' | 'lastName' | 'initials' | 'gender'> & {
        dateOfBirth?: string
    }
    paymentMethod: string
    articles: { article: ITinkaArticle }[]
    billingCustomer: AfterPayCustomer
    shippingCustomer?: AfterPayCustomer
    deliveryMethod: string
    deliveryDate?: string
}
export interface IPay extends Payload {
    serviceParameters: Pay
}
