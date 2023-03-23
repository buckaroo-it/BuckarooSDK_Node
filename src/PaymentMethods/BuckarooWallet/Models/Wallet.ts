import { ITransaction, Payload, RefundPayload } from '../../../Models/ITransaction'
import IBankAccount from '../../../Models/Services/IBankAccount'
import { ServiceObject } from '../../../Models/ServiceObject'

export interface IWallet extends ITransaction {
    invoice: string
    walletId: string
    email?: string
    bankAccount?: Pick<IBankAccount, 'iban'>
    customer?: {
        firstName: string
        lastName: string
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
export const Wallet = (data: IWallet) => {
    const formatData = new ServiceObject(data)
    formatData.setParameterKeys({
        firstName: 'consumerFirstName',
        lastName: 'consumerLastName',
        email: 'consumerEmail'
    })
    return formatData
}
