import { Payload } from '../../../Models/ITransaction';
export interface IPay extends Payload {
    paymentData: string;
    customerCardName: string;
}
