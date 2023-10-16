import { Model } from '../Model';

export default interface IBankAccount {
    iban: string;
    bic: string;
    accountName: string;
}

export class BankAccount extends Model implements IBankAccount {
    set accountName(accountName: string) {
        this.set('accountName', accountName);
    }

    set bic(bic: string) {
        this.set('bic', bic);
    }

    set iban(iban: string) {
        this.set('iban', iban);
    }
}
