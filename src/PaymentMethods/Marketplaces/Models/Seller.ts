import { Model } from '../../../Models';

export interface ISeller {
    accountId?: string;
    amount?: number;
    description?: string;
}

export class Seller extends Model implements ISeller {
    set accountId(value: string) {
        this.set('accountId', value);
    }

    set amount(value: number) {
        this.set('amount', value);
    }

    set description(value: string) {
        this.set('description', value);
    }
}
