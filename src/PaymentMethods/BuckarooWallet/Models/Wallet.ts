import { ITransaction, Payload, RefundPayload } from '../../../Models/ITransaction'

interface consumer {
    consumerFirstName?: string
    consumerLastName?: string
    consumerEmail?: string
    consumerIban?: string
}
export interface IWallet extends ITransaction, consumer {
    invoice: string
    walletId: string
}
export interface IWalletPay extends Payload, consumer {
    invoice: string
    walletId: string
}
export interface IWalletRefund extends RefundPayload {
    invoice: string
    walletId: string
}
