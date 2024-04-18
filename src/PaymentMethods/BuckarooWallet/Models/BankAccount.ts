import { BankAccount as BankAccountClass } from '../../../Models';

export class BankAccount extends BankAccountClass {
    set iban(value: string) {
        this.set('consumerIban', value);
    }
}
