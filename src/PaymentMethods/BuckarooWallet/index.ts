import { PayablePaymentMethod } from '../../Services';
import { IWallet, Wallet } from './Models/Wallet';
import { IPaymentRequest, IRefundRequest, IRequest } from '../../Models';

export default class BuckarooWallet<
    Code extends 'BuckarooWalletCollecting',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    pay(payload: IWallet & IPaymentRequest) {
        return super.pay(payload, new Wallet(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    create(payload: IWallet & IRequest) {
        this._requiredFields = ['currency'];
        this.setPayload(payload);
        this.setServiceList('Create', new Wallet(payload));
        return this.dataRequest();
    }

    deposit(payload: IWallet & IRefundRequest) {
        this.setPayload(payload);
        this.setServiceList('Deposit', new Wallet(payload));
        return super.transactionRequest();
    }

    reserve(payload: IWallet & IRefundRequest) {
        this.setPayload(payload);
        this.setServiceList('Reserve', new Wallet(payload));
        return super.transactionRequest();
    }

    withdrawal(payload: IWallet & IPaymentRequest) {
        this.setPayPayload(payload);
        this.setServiceList('Withdrawal', new Wallet(payload));
        return super.transactionRequest();
    }

    cancel(payload: IPaymentRequest & { walletMutationGuid: string }) {
        this.setPayPayload(payload);
        this.setServiceList('Withdrawal', new Wallet(payload));
        return super.transactionRequest();
    }

    update(payload: IWallet) {
        this.setServiceList('Update', new Wallet(payload));
        return this.dataRequest(payload);
    }

    getInfo(payload: IWallet) {
        this.setServiceList('GetInfo', new Wallet(payload));
        return this.dataRequest(payload);
    }

    release(payload: IWallet & IRefundRequest) {
        this.setServiceList('Release', new Wallet(payload));
        return this.dataRequest(payload);
    }
}
