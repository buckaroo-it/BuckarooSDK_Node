import { IPaymentRequest, IPerson, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    person: Partial<IPerson>;
    email?: string;
}

export class Pay extends ServiceParameter {
    set person(value: Partial<IPerson>) {
        this.set('person', value);
    }

    set email(value: string) {
        this.set('email', value);
    }
}
