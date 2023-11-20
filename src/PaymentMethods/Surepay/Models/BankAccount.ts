import { Model } from '../../../Models';

export interface IBankAccount {
    iban: string;
    accountName: string;
}

export class BankAccount extends Model implements IBankAccount {
    set accountName(value: string) {
        this.set('customeraccountname', value);
    }

    set iban(iban: string) {
        this.set('iban', iban);
    }
}
