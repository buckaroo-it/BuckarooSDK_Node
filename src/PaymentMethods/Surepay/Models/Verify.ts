import { IPaymentRequest } from '../../../Models/IRequest';

export interface IVerify extends IPaymentRequest {
    customeraccountname: string;
}
