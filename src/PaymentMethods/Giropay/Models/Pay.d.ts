import { Payload } from '../../../Models/ITransaction';
export interface Pay extends Payload {
    bic: string;
    costumerIBAN: string;
}
