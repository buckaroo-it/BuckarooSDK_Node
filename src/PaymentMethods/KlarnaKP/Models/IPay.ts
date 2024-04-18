import { IPaymentRequest, Person, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    reservationNumber?: string;
}

export class Pay extends ServiceParameter {
    set reservationNumber(value: string) {
        this.set('reservationNumber', value);
    }
}

export class Customer extends Person {
    set firstName(email: string) {
        this.set('customerFirstName', email);
    }

    set lastName(email: string) {
        this.set('customerLastName', email);
    }
}
