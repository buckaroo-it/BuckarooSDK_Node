import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    buyerEmail?: string
    productName?: string
    billingAgreementDescription?: string
    pageStyle?: string
    payPalOrderId?: string
}
