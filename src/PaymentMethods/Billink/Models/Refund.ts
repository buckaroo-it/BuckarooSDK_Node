import { ServiceParameter } from '../../../Models/ServiceParameters';
import { IRefundRequest } from '../../../Models/IRequest';

export interface IRefund extends IRefundRequest {
    refundReason?: string;
}
export class Refund extends ServiceParameter {
    set refundReason(value: string) {
        this.set('refundreason', value);
    }
}
