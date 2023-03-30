import { ITransaction, Payload, RefundPayload } from '../../../Models/ITransaction'
import IBankAccount from '../../../Models/Services/IBankAccount'
import { ServiceObject } from '../../../Models/ServiceObject'

export interface IWallet extends ITransaction {
    invoice: string
    walletId: string
    consumerEmail?: string
    bankAccount?:{
        consumerIban: string
    }
    customer?: {
        consumerFirstName: string
        consumerLastName: string
    }
}
export interface IWalletPay extends Payload {
    invoice: string
    walletId: string
}
export interface IWalletRefund extends RefundPayload {
    invoice: string
    walletId: string
}
