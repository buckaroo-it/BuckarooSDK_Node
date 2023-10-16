import { ServiceParameter } from '../../../Models/ServiceParameters';
import IDebtor, { Debtor as DebtorClass } from '../../../Models/Interfaces/IDebtor';
import IRequest from '../../../Models/IRequest';

export interface IDebtorInfo extends IRequest {
    debtor: IDebtor;
}

export class DebtorInfo extends ServiceParameter {
    set debtor(debtor: IDebtor) {
        this.set('debtor', new Debtor(debtor));
    }

    protected getGroups() {
        return super.getGroups({
            Debtor: 'Debtor',
        });
    }
}

class Debtor extends DebtorClass {
    set code(value: string) {
        this.set('DebtorCode', value);
    }
}
