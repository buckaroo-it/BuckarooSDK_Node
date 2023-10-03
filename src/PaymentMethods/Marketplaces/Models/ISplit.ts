import { IPaymentRequest } from '../../../Models/IRequest'

type Seller = {
    accountId?: string
    amount?: number
    description?: string
}
type Marketplace = {
    amount?: number
    description?: string
}
export interface ISplit extends IPaymentRequest {
    seller?: Seller[]
    marketplace?: Marketplace
    daysUntilTransfer?: number
}
export interface ITransfer extends IPaymentRequest {
    seller?: Seller[]
    marketplace?: Marketplace
    daysUntilTransfer?: number
    originalTransactionKey: string
}
