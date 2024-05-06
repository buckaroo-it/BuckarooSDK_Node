import { ServiceParameter } from '../../../Models';
import { IDebtorInfo } from './DebtorInfo';

export interface IDebtor extends IDebtorInfo {
    person: {
        culture: string;
        lastName: string;
    };
}

export class Debtor extends ServiceParameter {
    set debtor(value: string) {
        this.set('debtor', value);
    }

    set person(value: string) {
        this.set('person', value);
    }

    protected getGroups() {
        return super.getGroups({
            Debtor: 'Debtor',
            Person: 'Person',
        });
    }
}
