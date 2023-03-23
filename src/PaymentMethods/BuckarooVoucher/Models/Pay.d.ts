import { Payload } from '../../../Models/ITransaction';
export interface IPay extends Payload {
    voucherCode: string;
}
