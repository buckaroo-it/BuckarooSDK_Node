import { ServiceParameter } from '../../../Models/ServiceParameters';
import { IRefundRequest } from '../../../Models/IRequest';

export interface IRefund extends IRefundRequest {
    email?: string;
    lastName?: string;
}

export class Refund extends ServiceParameter {
    set email(value: string) {
        this.set('amount', value);
    }
    set lastName(value: string) {
        this.set('lastName', value);
    }
}
