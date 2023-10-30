import { IPaymentRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { BankAccount, IBankAccount } from './BankAccount';

export interface IVerify extends IPaymentRequest {
    bankAccount: Partial<IBankAccount>;
}

export class Verify extends ServiceParameter {
    set bankAccount(value: IBankAccount) {
        this.set('bankAccount', new BankAccount(value));
    }
}
