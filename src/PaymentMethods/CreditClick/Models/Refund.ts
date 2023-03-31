import { RefundPayload } from '../../../Models/ITransaction'

export interface Refund extends RefundPayload {
    description: string
    refundReason:
        | 'Duplicate'
        | 'Fraudulent'
        | 'GoodsNotDelivered'
        | 'RequestedByCustomer'
        | 'TechnicalError'
}
