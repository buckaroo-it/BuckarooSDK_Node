import { BankAccount as BankAccountClass } from '../../../Models/Interfaces/IBankAccount';

export class BankAccount extends BankAccountClass {
    set iban(value: string) {
        this.set('consumerIban', value);
    }
}
