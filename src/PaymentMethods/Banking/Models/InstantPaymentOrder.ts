import { IRequest, ServiceParameter } from '../../../Models';

export interface IInstantPaymentOrder extends IRequest {
    amountCredit: number;
    accountHolderName: string;
    iban: string;
}

export class InstantPaymentOrder extends ServiceParameter {
    set accountHolderName(value: string) {
        this.set('AccountHolderName', value);
    }

    set iban(value: string) {
        this.set('IBAN', value);
    }
}