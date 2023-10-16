import { IRefundRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IRefund extends IRefundRequest {
    description: string;
    refundReason: 'Duplicate' | 'Fraudulent' | 'GoodsNotDelivered' | 'RequestedByCustomer' | 'TechnicalError';
}

export class Refund extends ServiceParameter {
    set description(value: string) {
        this.set('description', value);
    }

    set refundReason(value: IRefund['refundReason']) {
        this.set('refundreason', value);
    }
}
