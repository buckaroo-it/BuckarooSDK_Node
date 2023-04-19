import { ITransaction } from '../../../Models/ITransaction'

type Seller = {
    accountId?: string
    amount?: number
    description?: string
}
type Marketplace = {
    amount?: number
    description?: string
}
export interface ISplit extends ITransaction {
    seller?: Seller[]
    marketplace?: Marketplace
    daysUntilTransfer?: number
}
export interface ITransfer extends ITransaction {
    seller?: Seller[]
    marketplace?: Marketplace
    daysUntilTransfer?: number
    originalTransactionKey: string
}
