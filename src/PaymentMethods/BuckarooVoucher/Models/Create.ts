import { IRequest, ServiceParameter } from '../../../Models';

export interface ICreate extends IRequest {
    groupReference?: string;
    /**
     * 1 = Single
     * 2 = Multiple
     */
    usageType: 1 | 2;
    validFrom: string;
    validUntil?: string;
    creationBalance: number;
}

export class Create extends ServiceParameter {
    set groupReference(value: string) {
        this.set('groupReference', value);
    }

    set usageType(value: 1 | 2) {
        this.set('usageType', value);
    }

    set validFrom(value: string) {
        this.set('validFrom', value);
    }

    set validUntil(value: string) {
        this.set('validUntil', value);
    }

    set creationBalance(value: number) {
        this.set('creationBalance', value);
    }
}
