import { IPaymentRequest } from '../../../Models/IRequest'
import { ITinkaArticle } from './Article'
import { ITinkaAddress } from './Address'
import Gender from '../../../Constants/Gender'
export interface IPay extends IPaymentRequest {
    paymentMethod: string
    deliveryMethod: string
    deliveryDate?: string
    article: ITinkaArticle[]
    billingCustomer: {
        email: string
        phone?: string
        prefixLastName?: string
    } & ITinkaAddress
    shippingCustomer?: {
        externalName: false
    } & ITinkaAddress
    dateOfBirth?: string
    firstName?: string
    gender?: Gender
    initials?: string
    lastName?: string
}
