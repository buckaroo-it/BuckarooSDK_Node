import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IWallet, IWalletPay, IWalletRefund } from './Models/Wallet'
import { ITransaction } from '../../Models/ITransaction'

export default class BuckarooWallet extends PayablePaymentMethod {
    protected _paymentName = 'BuckarooWalletCollecting'
    protected _serviceVersion = 1
    pay(payload: IWalletPay) {
        return super.pay(payload)
    }
    refund(payload: IWalletRefund) {
        return super.refund(payload)
    }
    deposit(payload: IWalletRefund) {
        this.action = 'Deposit'
        return super.transactionRequest(payload)
    }
    reserve(payload: IWalletRefund) {
        this.action = 'Reserve'
        return super.transactionRequest(payload)
    }
    withdrawal(payload: IWalletPay) {
        this.action = 'Withdrawal'
        return super.transactionRequest(payload)
    }
    cancel(payload: ITransaction & { walletMutationGuid: string }) {
        this.action = 'CancelReservation'
        return super.transactionRequest(payload)
    }
    create(payload: IWallet) {
        this.action = 'Create'
        return this.dataRequest(payload)
    }
    update() {
        this.action = 'Update'
        return this.dataRequest()
    }
    getInfo() {
        this.action = 'Getinfo'
        return this.dataRequest()
    }
    release() {
        this.action = 'Release'
        return this.dataRequest()
    }
}
