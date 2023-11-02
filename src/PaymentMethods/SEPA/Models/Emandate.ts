import { IPaymentRequest } from '../../../Models';

export interface IEmandate extends IPaymentRequest {
    mandateReference: string;
    collectdate?: string;
}
