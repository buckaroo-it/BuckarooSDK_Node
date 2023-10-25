import { IPaymentRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { IPerson } from '../../../Models/Interfaces/IRecipient';
import { Customer } from './Customer';

export interface IPay extends IPaymentRequest {
    customer: Partial<IPerson>;
    country?: 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'NL' | 'NO' | 'PL' | 'SE' | 'GB';
}

export class Pay extends ServiceParameter {
    set customer(value: Partial<IPerson>) {
        this.set('customer', new Customer(value));
    }

    set country(value: string) {
        this.set('country', value);
    }
}
