import { Debtor as DebtorClass, IDebtor, IRequest, ServiceParameter } from '../../../Models';

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
