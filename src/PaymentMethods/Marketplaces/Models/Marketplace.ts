import { Model } from '../../../Models';

export interface IMarketplace {
    amount: number;
    description: string;
}

export class Marketplace extends Model implements IMarketplace {
    set amount(value: number) {
        this.set('amount', value);
    }

    set description(value: string) {
        this.set('description', value);
    }
}
