import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IWallet, IWalletPay, IWalletRefund, Wallet } from './Models/Wallet'
import { ITransaction } from '../../Models/ITransaction'

class BuckarooWallet extends PayablePaymentMethod {
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
        this.setRequest(payload)
        return super.transactionRequest()
    }
    reserve(payload: IWalletRefund) {
        this.action = 'Reserve'
        this.setRequest(payload)
        return super.transactionRequest()
    }
    withdrawal(payload: IWalletPay) {
        this.action = 'Withdrawal'
        this.setRequest(payload)
        return super.transactionRequest()
    }
    cancel(payload: ITransaction & { walletMutationGuid: string }) {
        this.action = 'CancelReservation'
        this.setRequest(payload)
        return super.transactionRequest()
    }
    create(payload: IWallet) {
        this.action = 'Create'
        this.serviceParametersStrategy = Wallet
        this.setRequest(payload)
        return this.dataRequest()
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

let _buckaroowallet: BuckarooWallet
const buckaroowallet: () => BuckarooWallet = () => {
    if (!_buckaroowallet) _buckaroowallet = new BuckarooWallet()
    return _buckaroowallet
}
export default buckaroowallet
