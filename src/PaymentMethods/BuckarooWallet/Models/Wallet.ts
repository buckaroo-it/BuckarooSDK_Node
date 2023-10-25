import IRequest from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { IPerson } from '../../../Models/Interfaces/IRecipient';
import { Customer } from './Customer';
import IBankAccount from '../../../Models/Interfaces/IBankAccount';
import { BankAccount } from './BankAccount';

export interface IWallet extends IRequest {
    invoice?: string;
    walletId?: string;
    customer?: Partial<IPerson>;
    bankAccount?: Partial<IBankAccount>;
    walletMutationGuid?: string;
    status?: string;
}

export class Wallet extends ServiceParameter {
    set walletId(value: string) {
        this.set('walletId', value);
    }

    set customer(value: Partial<IPerson>) {
        this.set('customer', new Customer(value));
    }

    set email(value: string) {
        this.set('consumerEmail', value);
    }

    set status(value: string) {
        this.set('status', value);
    }

    set walletMutationGuid(value: string) {
        this.set('walletMutationGuid', value);
    }

    set bankAccount(value: IBankAccount) {
        this.set('bankAccount', new BankAccount(value));
    }
}
